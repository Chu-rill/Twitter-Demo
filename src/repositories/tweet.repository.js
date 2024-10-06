const Tweet = require("../models/Tweet");

class TweetRepository {
  // Find all users
  async findAll() {
    return await Tweet.find().limit(10);
  }

  // Find user by ID
  async findById(id) {
    return await Tweet.findById(id);
  }

  //find tweet by userId
  async findUserTweet(userId) {
    return await Tweet.find({ user: userId });
  }

  // Create a new user
  async createTweet({
    tweet: tweetContent,
    username,
    media,
    profilePicture,
    likes,
    retweet,
    views,
    user,
  }) {
    const tweet = await Tweet.create({
      tweet: tweetContent,
      username,
      media,
      profilePicture,
      likes,
      retweet,
      views,
      user,
    });
    return tweet;
  }

  async update(id, updateData) {
    return await Tweet.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a user by ID
  async delete(id) {
    return await Tweet.findByIdAndDelete(id);
  }

  // Find user by username
  async getByTweet(tweet) {
    const existingTweet = await Tweet.findOne({ tweet });
    return existingTweet;
  }
}

module.exports = new TweetRepository();
