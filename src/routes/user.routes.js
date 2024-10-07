const express = require("express");
const userController = require("../controllers/user.controller");
const { protect, authorizeUser } = require("../middleWare/authorize");
import { validateSchema } from "../middleware/ValidationMiddleware";
import {
  deleteUserValidation,
  followUserValidation,
  getUserValidation,
  unfollowUserValidation,
  updateUserValidation,
  viewFollowersValidation,
  viewFollowingValidation,
} from "../validation/user.validation";
const userRoutes = express.Router();

userRoutes.get("/users", protect, userController.getAllUsers);
userRoutes.get(
  "/user/:id",
  validateSchema(getUserValidation),
  protect,
  userController.getUser
);
userRoutes.put(
  "/update-user/:id",
  validateSchema(updateUserValidation),
  authorizeUser,
  userController.updateUser
);
userRoutes.delete(
  "/delete-user/:id",
  validateSchema(deleteUserValidation),
  authorizeUser,
  userController.deleteUser
);
userRoutes.post(
  "/follow-user",
  validateSchema(followUserValidation),
  protect,
  userController.followUser
);
userRoutes.post(
  "/unfollow-user",
  validateSchema(unfollowUserValidation),
  protect,
  userController.unfollowUser
);
userRoutes.get(
  "/followers/:id",
  validateSchema(viewFollowersValidation),
  protect,
  userController.viewFollowers
);
userRoutes.get(
  "/following/:id",
  validateSchema(viewFollowingValidation),
  protect,
  userController.viewFollowing
);
module.exports = userRoutes;
