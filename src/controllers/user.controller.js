const sendErrorResponse = require("../error/validation.error");
const userRepository = require("../repositories/user.repository");
const userService = require("../service/user.service");

class UserController {
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const response = await userService.deleteUser(id);
      if (response.status === "success") res.cookie("jwt", "", { maxAge: 0 });

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const response = await userService.getAllUsers();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get users error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUser(req, res) {
    const { id } = req.params;
    try {
      const response = await userService.getUser(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      // Call the update service
      const response = await userService.updateUser(id, updateData);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  async followUser(req, res) {
    const { followerId, followeeId } = req.body;
    try {
      // Call the followUser service
      const response = await userService.followUser(followerId, followeeId);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  async viewFollowers(req, res) {
    const { id } = req.params;
    try {
      // Call the viewFollowers service
      const response = await userService.viewFollowers(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  async viewFollowing(req, res) {
    const { id } = req.params;
    try {
      // Call the viewFollowing service
      const response = await userService.viewFollowing(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  async unfollowUser(req, res) {
    const { followerId, followeeId } = req.body;
    try {
      // Call the unfollowUser service
      const response = await userService.unfollowUser(followerId, followeeId);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

module.exports = new UserController();
