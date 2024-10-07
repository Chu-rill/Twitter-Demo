const express = require("express");
const authController = require("../controllers/auth.controller");
const { login, register } = require("../validation/auth.validation");
const validator = require("../middleWare/ValidationMiddleware");

const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  validator.validateSchema(register),
  authController.signup
);
authRoutes.post(
  "/login",
  validator.validateSchema(login),
  authController.login
);

module.exports = authRoutes;
