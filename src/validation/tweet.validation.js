const joi = require("joi");

exports.create_tweet = joi.object({
  tweet: joi.string().required().messages({
    "string.base": "tweet must be a string",
    "string.empty": "tweet is required",
    "any.required": "tweet is a required field",
  }),
  username: joi.string().required().messages({
    "string.base": "username must be a string",
    "string.empty": "username is required",
    "any.required": "username is a required field",
  }),
  profilePicture: joi.string().optional().allow("").messages({
    "string.base": "profilePicture must be a string",
  }),
  likes: joi.number().optional().messages({
    "number.base": "likes must be a number",
  }),
  retweet: joi.number().optional().messages({
    "number.base": "retweet must be a number",
  }),
  views: joi.number().optional().messages({
    "number.base": "views must be a number",
  }),
  user: joi.string().required().messages({
    "string.base": "user must be a string",
    "string.empty": "user is required",
    "any.required": "user is a required field",
  }),
});
