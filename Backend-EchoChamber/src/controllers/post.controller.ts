import { Request, Response } from "express";
import { ExtendedRequest } from "../global/type";
import Post from "../database/models/post.model";

class PostController {
  static async createPost(req: ExtendedRequest, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: "The request body was undefined" });
      return;
    }
    try {
      const { content, imageUrl } = req.body;

      // checking for the content
      if (!content) {
        res.status(400).json({ message: "Post content is required" });
        return;
      }

      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const post = await Post.create({
        content,
        imageUrl,
        userId: req.user.id,
      });
      res.status(201).json({ message: "Post created", post });
      return;
    } catch (e) {
      console.log("Internal server error while creating post", e);
      res
        .status(500)
        .json({ message: "Internal server error while crating post" });
    }
  }
}

export default PostController;
