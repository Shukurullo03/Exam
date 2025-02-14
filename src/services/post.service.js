import postModel from "../models/post.model.js";
import joiService from "./joi.service.js";
import jwtService from "./jwt.service.js";

class postService {
  constructor() {
    this.postModel = postModel;
    this.joiService = new joiService();
    this.jwtService = new jwtService();
  }
  async addPosts(token, body) {
    const { title, content, category } = body;
    await this.joiService.validatePostData({ title, content, category });

    const decoded = this.jwtService.verifyToken(token);
    const id = decoded.user_id;

    return await this.postModel.create({
      title,
      content,
      category,
      author: id,
    });
  }

  async getPostsByCategory(category) {
    const posts = await this.postModel
      .find({ category })
      .populate("author", "username")
      .exec();

    if (!posts || posts.length === 0) {
      throw new Error("Bu kategoriyada postlar topilmadi.");
    }

    return posts;
  }
  async getTopPosts() {
    return await this.postModel.aggregate([
      { $sort: { views: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      {
        $unwind: "$authorInfo",
      },
      {
        $project: {
          title: 1,
          views: 1,
          author: "$authorInfo.username",
        },
      },
    ]);
  }
  async updatePost(token, postId, body) {
    const decoded = this.jwtService.verifyToken(token);
    const userId = decoded.user_id;

    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error("Post topilmadi");
    }

    if (post.author.toString() !== userId) {
      throw new Error("Siz faqat o‘z postlaringizni tahrirlashingiz mumkin");
    }

    await this.joiService.validatePostData(body);

    const updatedPost = await this.postModel.findByIdAndUpdate(postId, body, {
      new: true,
    });

    return updatedPost;
  }
  async getUserPosts(token) {
    const decoded = this.jwtService.verifyToken(token);
    const userId = decoded.user_id;

    return await this.postModel
      .find({ author: userId })
      .select("title category views createdAt")
      .sort({ createdAt: -1 });
  }
  async deletePost(token, postId) {
    const decoded = this.jwtService.verifyToken(token);
    const userId = decoded.user_id;

    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error("Post topilmadi");
    }

    if (post.author.toString() !== userId) {
      throw new Error("Siz faqat o‘z postlaringizni o‘chira olasiz");
    }

    await this.postModel.findByIdAndDelete(postId);
    return { success: true, message: "Post o‘chirildi" };
  }
  async searchPosts(query) {
    const { title, category } = query;

    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (category) filter.category = category;

    const posts = await this.postModel.find(filter);
    return posts;
  }
}
export default postService;
