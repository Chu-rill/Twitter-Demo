const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  tweet: { type: String, required: true },
  username: { type: String, required: true },
  media: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  retweet: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Tweet", TweetSchema);
