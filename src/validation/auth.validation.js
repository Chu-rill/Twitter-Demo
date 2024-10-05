const joi = require("joi");

exports.register_query_validator = joi.object({
  username: joi.string().required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "any.required": "Username is a required field",
  }),
  password: joi.string().required().min(6).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
    "string.min": "Password must be at least 6 characters long",
  }),
  email: joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
  }),
  bio: joi.string().required().messages({
    "string.base": "bio must be a string",
    "string.empty": "bio is required",
    "any.required": "bio is a required field",
  }),
});

exports.login_query_validator = joi.object({
  username: joi.string().required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "any.required": "Username is a required field",
  }),
  password: joi.string().required().min(6).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
    "string.min": "Password must be at least 6 characters long",
  }),
});
