const express = require("express");
const tweetController = require("../controllers/tweet.controller");
const validator = require("../middleWare/ValidationMiddleware");
const { create_tweet } = require("../validation/tweet.validation");
const { protect } = require("../middleWare/authorize");

const tweetRoutes = express.Router();

tweetRoutes.post(
  "/create-tweet",
  validator.validateSchema(create_tweet),
  tweetController.create
);
tweetRoutes.get("/tweets", protect, tweetController.getAllTweet);
tweetRoutes.delete("/delete-tweet/:id", protect, tweetController.deleteTweet);
tweetRoutes.get("/tweet/:id", protect, tweetController.getTweet);
tweetRoutes.get("/tweets/:id", protect, tweetController.getUserTweets);
tweetRoutes.put("/update-tweet/:id", protect, tweetController.updateTweet);
module.exports = tweetRoutes;
