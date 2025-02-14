import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwtService from "./jwt.service.js";
import joiService from "./joi.service.js";
class authService {
  constructor() {
    this.userModel = userModel;
    this.jwt = new jwtService();
    this.joiService = new joiService();
    this.bcrypt = bcrypt;
  }
  async registerUser(body) {
    const findUser = await this.userModel.findOne({ username: body.username });
    if (findUser) throw new Error("user already existed");
    const hashedPassword = await bcrypt.hash(body.password,12);
    await this.joiService.validateUserData(body);
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword
    });
    const token = this.jwt.generateToken(user._id);
    return {
      token: token,
      user: {
        username: user.username,
        email: user.email
      }
    };
  }
  async loginUser(email, password) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await this.bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return {
      token: this.jwt.generateToken(user._id),
      user: { username: user.username, email: user.email },
    };
  }
}
export default authService;
