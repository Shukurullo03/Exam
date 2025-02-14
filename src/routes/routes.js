import authRouter from "./authRoutes.js";
import postRouter from "./postRoutes.js";
const Routes = () => {
  return [authRouter, postRouter];
};
export default Routes;
