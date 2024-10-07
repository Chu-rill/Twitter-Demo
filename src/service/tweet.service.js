const {
  doesNotExistError,
  defaultError,
  noDuplicateError,
} = require("../error/error");
const httpStatus = require("http-status");
const tweetRepository = require("../repositories/tweet.repository");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
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

      const tweet = await tweetRepository.createTweet({
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

      // Invalidate the cache
      myCache.del("allTweet"); // Remove the cached tweets
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        data: {
          tweet,
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

      // Invalidate the cache
      myCache.del("allTweet"); // Remove the cached tweets

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
      const cacheKey = "allTweet";

      // Check if tweet are in the cache
      const cachedTweets = myCache.get(cacheKey);
      if (cachedTweets) {
        return {
          status: "success",
          error: false,
          statusCode: httpStatus.OK,
          message: "Tweet retrieved successfully ",
          data: cachedTweets,
        };
      }

      // If not in cache, fetch from the database
      const tweet = await tweetRepository.findAll();
      if (!tweet || tweet.length === 0)
        return { status: "error", message: "No tweet found." };

      // Store the users in the cache
      myCache.set(cacheKey, tweet, 600);

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

      // Invalidate the cache
      myCache.del("allTweet"); // Remove the cached tweets

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

  async getUserTweets(userId) {
    try {
      //check cache for tweets
      const cachedTweets = myCache.get(userId);

      if (cachedTweets) {
        return {
          status: "success",
          error: false,
          statusCode: httpStatus.OK,
          message: "Tweets retrieved successfully ",
          data: cachedTweets,
        };
      }
      // Find all tweets by the userId
      const tweets = await tweetRepository.findUserTweet(userId);

      // If no tweets found, return an error message
      if (!tweets || tweets.length === 0) {
        return {
          status: "error",
          statusCode: httpStatus.NOT_FOUND,
          message: "No tweets found for this user.",
          error: true,
        };
      }

      // Cache the tweets for future requests
      myCache.set(userId, tweets);
      // Return success response with tweets
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Tweets retrieved successfully",
        data: tweets,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }
}

module.exports = new TweetService();
