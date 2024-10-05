const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the Bearer token in the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the database based on the decoded token (without password)
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("Token verification failed", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
const authorizeUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the Bearer token in the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the database based on the decoded token (without password)
      const user = await User.findById(decoded.id).select("-password");

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user ID in the token matches the user ID in the request
      if (user.id !== req.params.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify this user" });
      }

      // Attach the user to the request object
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("Token verification failed", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
module.exports = { protect, authorizeUser };
