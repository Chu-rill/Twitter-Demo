const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./src/routes/user.routes");
require("dotenv").config();
const { connectDB } = require("./src/utils/db");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./src/routes/auth.routes");
const tweetRoutes = require("./src/routes/tweet.routes");
const port = process.env.PORT;

// Set up the rate limiter to allow 50 requests per minute (windowMs = 1 minute, max = 50)
let limiter = rateLimit({
  max: 100, // 100 requests
  windowMs: 60 * 60 * 1000, // 1 hour
  message:
    "We have received too many requests from this IP. Please try again after one minute.",
});

// Middleware setup
app.use(
  cors({
    origin: process.env.ALLOWED_URL || "*", // Your frontend URL, default to *
    methods: "*",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.json({ success: true, message: "Backend Connected Successfully" });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tweet", tweetRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  // Connect to the database
  connectDB();
});
