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
});

module.exports = mongoose.model("User", UserSchema);
