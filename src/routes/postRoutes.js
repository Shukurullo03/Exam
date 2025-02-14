import { Router } from "express";
import postController from "../controllers/postController.js";
const postRouter = Router();
const controller = new postController();
postRouter.post("/posts/create", (req, res) =>
  controller.addPostsController(req, res)
);
postRouter.get("/posts/category/:category", (req, res) =>
  controller.getPostsByCategoryController(req, res)
);
postRouter.get("/posts/top", (req, res) =>
  controller.getTopPostsController(req, res)
);
postRouter.put("/posts/:id", (req, res) =>
  controller.updatePostController(req, res)
);
postRouter.get("/users/posts", (req, res) =>
  controller.getUserPostsController(req, res)
);
postRouter.delete("/posts/:id", (req, res) =>
  controller.deletePostController(req, res)
);
postRouter.get("/posts/search", (req, res) =>
  controller.searchPostsController(req, res)
);

export default postRouter;
