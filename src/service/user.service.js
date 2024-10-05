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
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        data: { username, email, bio },
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
      const users = await userRepository.findAll();
      if (!users || users.length === 0)
        return { status: "error", message: "No users found." };

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
}

module.exports = new UserService();
