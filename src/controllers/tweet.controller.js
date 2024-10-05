const tweetService = require("../service/tweet.service");

class TweetController {
  async create(req, res) {
    const {
      tweet,
      username,
      media,
      profilePicture,
      likes,
      retweet,
      views,
      user,
    } = req.body;
    try {
      const response = await tweetService.createTweet(
        tweet,
        username,
        media,
        profilePicture,
        likes,
        retweet,
        views,
        user
      );
      if (response.error) {
        return res
          .status(response.statusCode)
          .json({ message: response.message });
      }

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteTweet(req, res) {
    const { id } = req.params;
    try {
      const response = await tweetService.deleteTweet(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllTweet(req, res) {
    try {
      const response = await tweetService.getAllTweet();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get tweet error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getTweet(req, res) {
    const { id } = req.params;
    try {
      const response = await tweetService.getTweet(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get tweet error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateTweet(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      // Call the update service
      const response = await tweetService.updateTweet(id, updateData);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update tweet error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

module.exports = new TweetController();
