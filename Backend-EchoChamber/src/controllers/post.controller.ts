import { Request, Response } from "express";
import { ExtendedRequest } from "../global/type";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";

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

  static async getAllPost(req: Request, res: Response) {
    try {
      const post = await Post.findAll({
        order: [["createdAt", "desc"]],
        include: {
          model: User,
          attributes: ["id", "username", "profile"],
        },
      });

      res
        .status(200)
        .json({ message: "Post data fetched succesfully", data: post });
      return;
    } catch (e) {
      console.log("Error while getting the post", e);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
}

export default PostController;
