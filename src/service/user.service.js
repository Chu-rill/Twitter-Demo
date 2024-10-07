const jwt = require("jsonwebtoken");
const { comparePassword, encrypt } = require("../utils/encryption");
const {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
} = require("../error/error");
const httpStatus = require("http-status");
const userRepository = require("../repositories/user.repository");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class UserService {
  async loginUser(username, password) {
    try {
      const user = await userRepository.getUserByUsername(username);
      if (!user) return doesNotExistError;

      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) return passwordMismatchError;

      const payload = { username: user.username, id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        user: { username: user.username, id: user._id },
        token,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async createUser(username, password, email, bio) {
    try {
      let user = await userRepository.getUserByUsername(username);
      if (user) return noDuplicateError;

      const hashedPassword = await encrypt(password);
      user = await userRepository.createUser({
        username,
        password: hashedPassword,
        email,
        bio,
      });

      if (!user) return defaultError;

      // Invalidate the cache
      myCache.del("allUsers"); // Remove the cached users
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        data: user,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async deleteUser(id) {
    try {
      const user = await userRepository.delete(id);
      if (!user) return doesNotExistError;

      // Invalidate the cache
      myCache.del("allUsers"); // Remove the cached users

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async getAllUsers() {
    try {
      const cacheKey = "allUsers";

      // Check if users are in the cache
      const cachedUsers = myCache.get(cacheKey);
      if (cachedUsers) {
        return {
          status: "success",
          error: false,
          statusCode: httpStatus.OK,
          message: "Users retrieved successfully ",
          data: cachedUsers,
        };
      }

      // If not in cache, fetch from the database
      const users = await userRepository.findAll();
      if (!users || users.length === 0)
        return { status: "error", message: "No users found." };

      // Store the users in the cache
      myCache.set(cacheKey, users, 600);

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: users,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }
  async getUser(id) {
    try {
      const users = await userRepository.findById(id);
      if (!users || users.length === 0)
        return { status: "error", message: "No user found." };

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: users,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async updateUser(id, updateData) {
    try {
      const user = await userRepository.findById(id);

      // Check if the user exists
      if (!user) {
        return {
          status: "error",
          statusCode: 404,
          message: "No user found.",
        };
      }

      // Update the user details
      const updatedUser = await userRepository.update(id, updateData);

      if (!updatedUser) {
        return {
          status: "error",
          statusCode: 400,
          message: "Failed to update user.",
        };
      }

      // Invalidate the cache
      myCache.del("allUsers"); // Remove the cached users

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User updated successfully",
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error); // Assuming defaultError is a utility to handle errors
    }
  }
  async followUser(followerId, followeeId) {
    try {
      const follower = await userRepository.findById(followerId);
      const followee = await userRepository.findById(followeeId);

      // Ensure the followee isn't already followed
      if (!follower.followingList.includes(followeeId)) {
        // Add the followee to the follower's following list
        follower.followingList.push(followeeId);
        follower.following += 1;

        // Add the follower to the followee's followers list
        followee.followersList.push(followerId);
        followee.followers += 1;

        await follower.save();
        await followee.save();

        // Invalidate the cache
        myCache.del("allUsers"); // Remove the cached users

        return {
          status: "success",
          error: false,
          statusCode: httpStatus.OK,
          message: `You are now following ${followee.username}`,
        };
      } else {
        return {
          status: "error",
          message: "You are already following this user",
        };
      }
    } catch (error) {
      console.error("Follow error:", error);
      return {
        status: "error",
        message: "An error occurred while following the user",
      };
    }
  }
  async viewFollowers(id) {
    try {
      const user = await userRepository.viewFollowers(id);

      if (!user) return { status: "error", message: "User not found" };

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: `Followers for ${user.username} retrieved successfully`,
        data: user.followersList,
      };
    } catch (error) {
      console.error("View followers error:", error);
      return {
        status: "error",
        message: "An error occurred while fetching followers",
      };
    }
  }
  async viewFollowing(id) {
    try {
      const user = await userRepository.viewFollowing(id);

      if (!user) return { status: "error", message: "User not found" };

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: `Following list for ${user.username} retrieved successfully`,
        data: user.followingList,
      };
    } catch (error) {
      console.error("View following error:", error);
      return {
        status: "error",
        message: "An error occurred while fetching following list",
      };
    }
  }
  async unfollowUser(followerId, followeeId) {
    try {
      const follower = await userRepository.findById(followerId);
      const followee = await userRepository.findById(followeeId);

      if (follower.followingList.includes(followeeId)) {
        // Remove the followee from the follower's following list
        follower.followingList.pull(followeeId);
        follower.following -= 1;

        // Remove the follower from the followee's followers list
        followee.followersList.pull(followerId);
        followee.followers -= 1;

        await follower.save();
        await followee.save();

        // Invalidate the cache
        myCache.del("allUsers"); // Remove the cached users

        return {
          status: "success",
          error: false,
          statusCode: httpStatus.OK,
          message: `You have unfollowed ${followee.username}`,
        };
      } else {
        return { status: "error", message: "You are not following this user" };
      }
    } catch (error) {
      console.error("Unfollow error:", error);
      return {
        status: "error",
        message: "An error occurred while unfollowing the user",
      };
    }
  }
}

module.exports = new UserService();
