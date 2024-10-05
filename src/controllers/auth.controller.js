const userService = require("../service/user.service");
class AuthController {
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const response = await userService.loginUser(username, password);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async signup(req, res) {
    const { username, password, email, bio } = req.body;
    try {
      const response = await userService.createUser(
        username,
        password,
        email,
        bio
      );
      if (response.error) {
        return res
          .status(response.statusCode)
          .json({ message: response.message });
      }

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
