import authService from "../services/auth.service.js";

class authController {
  constructor() {
    this.authService = new authService()
  }
  async register(req, res) {
    try {
      const body=req.body
      const response = await this.authService.registerUser(body);
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const response = await this.authService.loginUser(
        req.body.email,
        req.body.password
      );
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default authController;
