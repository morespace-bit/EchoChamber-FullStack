import { Response } from "express";
import { ExtendedRequest } from "../global/type";
import Post from "../database/models/post.model";

class LikeController {
  static async addLike(req: ExtendedRequest, res: Response) {
    if (!req.user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const { postId } = req.params;

      const post = await Post.findByPk(postId);

      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      await Post.increment("likes", { by: 1, where: { id: postId } });

      const updatedLike = await Post.findByPk(postId);
      res
        .status(201)
        .json({ message: "Like added", likes: updatedLike?.likes });
    } catch (e) {
      console.log("Error while liking the post");
      res.status(500).json({ message: "something went wrong" });
      return;
    }
  }

  static async removeLike(req: ExtendedRequest, res: Response) {
    if (!req.user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const { postId } = req.params;
      if (!postId) {
        res.status(400).json({ message: "The post does not exist" });
      }

      await Post.decrement("likes", { by: 1, where: { id: postId } });
      const updatedLike = await Post.findByPk(postId);

      res
        .status(201)
        .json({ message: "Liked removed ", likes: updatedLike?.likes });
    } catch (e) {
      console.log("Error", e);
      res.status(500).json({ message: "Error something went wrong" });
    }
  }
}

export default LikeController;
