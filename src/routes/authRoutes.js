import { Router } from "express";
import authController from "../controllers/authController.js";
const authRouter = Router();
const controller = new authController();
authRouter.post("/auth/register", (req, res) => controller.register(req, res));
authRouter.post("/auth/login", (req, res) => controller.login(req, res));
export default authRouter;
