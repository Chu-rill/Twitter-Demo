const express = require("express");
const userController = require("../controllers/user.controller");
const { protect, authorizeUser } = require("../middleWare/authorize");

const userRoutes = express.Router();

userRoutes.get("/users", protect, userController.getAllUsers);
userRoutes.get("/user/:id", protect, userController.getUser);
userRoutes.put("/update-user/:id", authorizeUser, userController.updateUser);
userRoutes.delete("/delete-user/:id", authorizeUser, userController.deleteUser);
userRoutes.post("/follow-user", protect, userController.followUser);
userRoutes.post("/unfollow-user", protect, userController.unfollowUser);
userRoutes.get("/followers/:id", protect, userController.viewFollowers);
userRoutes.get("/following/:id", protect, userController.viewFollowing);
module.exports = userRoutes;
