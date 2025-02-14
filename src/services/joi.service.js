import Joi from "joi";
class joiService {
  constructor() {
    this.joi = Joi;
  }
  async validateUserData(data) {
    const schema = this.joi.object({
      username: this.joi.string().min(3).max(15).required(),
      email: this.joi.string().email().required(),
      password: this.joi.string().min(6).max(15).required(),
      role: this.joi.string(),
    });
    await schema.validateAsync(data);
  }
  async validatePostData(data) {
    const schema = this.joi.object({
      title: Joi.string().min(3).max(100).required(),
      content: Joi.string().min(10).required(),
      category: Joi.string().required(),
    });
    await schema.validateAsync(data);
  }
}

export default joiService;
