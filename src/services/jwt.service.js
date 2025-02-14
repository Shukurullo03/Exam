import jwt from "jsonwebtoken";

class jwtService {
  constructor() {
    this.jwt = jwt;
    this.secretKey = process.env.JWT_SECRET_KEY;
  }
  generateToken(userId) {
    const token = this.jwt.sign({ user_id: userId }, this.secretKey, {
      expiresIn: "24h",
    });
    return token;
  }
  verifyToken(token) {
    try {
      return this.jwt.verify(token, this.secretKey);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token muddati eskirgan");
      } else {
        throw new Error("Noto‘g‘ri token yoki tasdiqlash muvaffaqiyatsiz");
      }
    }
  }
}

export default jwtService;
