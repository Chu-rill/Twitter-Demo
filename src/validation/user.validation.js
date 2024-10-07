import Joi from "joi";

// deleteUserValidation validator schema
export const deleteUserValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

// getUserValidation validator schema
export const getUserValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

// updateUserValidation validator schema
export const updateUserValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  username: Joi.string().optional().messages({
    "string.base": "username must be a string",
  }),
  password: Joi.string().optional().messages({
    "string.base": "password must be a string",
  }),
  profilePicture: Joi.string().optional().messages({
    "string.base": "profilePicture must be a string",
  }),
  bio: Joi.string().optional().messages({
    "string.base": "bio must be a string",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
  }),
});

export const followUserValidation = Joi.object({
  followerId: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  followeeId: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const unfollowUserValidation = Joi.object({
  followerId: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  followeeId: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const viewFollowersValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const viewFollowingValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});
