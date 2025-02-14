import postService from "../services/post.service.js";

class postController {
  constructor() {
    this.postService = new postService();
  }
  async addPostsController(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token kerak, iltimos tizimga kiring." });
      }
      const postBody = req.body;
      const newPost = await this.postService.addPosts(token, postBody);

      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async getPostsByCategoryController(req, res) {
    try {
      const { category } = req.params;
      const posts = await this.postService.getPostsByCategory(category);

      if (!posts.length) {
        return res
          .status(404)
          .json({ message: "Bu kategoriyada post topilmadi" });
      }
      const formattedPosts = posts.map((post) => ({
        title: post.title,
        content: post.content,
        author: post.author.username,
        views: post.views || 0,
      }));

      res.json({ posts: formattedPosts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getTopPostsController(req, res) {
    try {
      const topPosts = await this.postService.getTopPosts();

      if (!topPosts.length) {
        return res.status(404).json({ message: "Hali hech qanday post yo‘q" });
      }

      res.json({ topPosts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updatePostController(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token kerak, iltimos tizimga kiring." });
      }

      const { id } = req.params;
      const updatedPost = await this.postService.updatePost(
        token,
        id,
        req.body
      );

      res.json(updatedPost);
    } catch (error) {
      if (error.message === "Post topilmadi") {
        return res.status(404).json({ message: error.message });
      }
      if (
        error.message.includes(
          "faqat o‘z postlaringizni tahrirlashingiz mumkin"
        )
      ) {
        return res.status(403).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }
  async getUserPostsController(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token kerak, iltimos tizimga kiring." });
      }

      const posts = await this.postService.getUserPosts(token);
      res.json({ posts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async deletePostController(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Token kerak, iltimos tizimga kiring." });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token noto‘g‘ri formatda" });
      }

      const response = await this.postService.deletePost(token, req.params.id);
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async searchPostsController(req, res) {
    try {
      const posts = await this.postService.searchPosts(req.query);
      res.json({ posts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default postController;
