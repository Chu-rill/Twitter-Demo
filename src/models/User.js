const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, unique: true },
  profilePicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    required: true,
  },
  following: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  followingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followersList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", UserSchema);
