const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  login_query_validator,
  register_query_validator,
} = require("../validation/auth.validation");
const validator = require("../middleWare/ValidationMiddleware");

const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  validator.validateSchema(register_query_validator),
  authController.signup
);
authRoutes.post(
  "/login",
  validator.validateSchema(login_query_validator),
  authController.login
);

module.exports = authRoutes;
