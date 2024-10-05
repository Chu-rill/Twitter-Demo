const {
  doesNotExistError,
  defaultError,
  noDuplicateError,
} = require("../error/error");
const httpStatus = require("http-status");
const tweetRepository = require("../repositories/tweet.repository");

class TweetService {
  async createTweet(
    tweetContent,
    username,
    media,
    profilePicture,
    likes,
    retweet,
    views,
    user
  ) {
    try {
      let existingTweet = await tweetRepository.getByTweet(tweetContent);
      if (existingTweet) return noDuplicateError;

      const tweet = await tweetRepository.createUser({
        tweet: tweetContent,
        username,
        media,
        profilePicture,
        likes,
        retweet,
        views,
        user,
      });

      if (!tweet) return defaultError;
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        data: {
          tweet,
          username,
          media,
          profilePicture,
          likes,
          retweet,
          views,
          user,
        },
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async deleteTweet(id) {
    try {
      const user = await tweetRepository.delete(id);
      if (!user) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Tweet deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async getAllTweet() {
    try {
      const tweet = await tweetRepository.findAll();
      if (!tweet || tweet.length === 0)
        return { status: "error", message: "No tweet found." };

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Tweets retrieved successfully",
        data: tweet,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }
  async getTweet(id) {
    try {
      const tweet = await tweetRepository.findById(id);
      if (!tweet || tweet.length === 0)
        return { status: "error", message: "No tweet found." };

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Tweet retrieved successfully",
        data: tweet,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async updateTweet(id, updateData) {
    try {
      const tweet = await tweetRepository.findById(id);

      // Check if the user exists
      if (!tweet) {
        return {
          status: "error",
          statusCode: 404,
          message: "No tweet found.",
        };
      }

      // Update the user details
      const updatedTweet = await tweetRepository.update(id, updateData);

      if (!updatedTweet) {
        return {
          status: "error",
          statusCode: 400,
          message: "Failed to update tweet.",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Tweet updated successfully",
        data: updatedTweet,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error); // Assuming defaultError is a utility to handle errors
    }
  }
}

module.exports = new TweetService();
