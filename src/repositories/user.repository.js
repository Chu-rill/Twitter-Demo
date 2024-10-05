const User = require("../models/User");

class UserRepository {
  // Find all users
  async findAll() {
    return await User.find().limit(10).select("-password");
  }

  // Find user by ID
  async findById(id) {
    return await User.findById(id);
  }

  // Create a new user
  async createUser({ username, password, email, bio }) {
    const user = await User.create({
      username,
      password,
      email,
      bio,
    });
    return user;
  }

  async update(id, updatedUser) {
    return await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a user by ID
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  // Find user by username
  async getUserByUsername(username) {
    const user = await User.findOne({ username });
    return user;
  }
}

module.exports = new UserRepository();
