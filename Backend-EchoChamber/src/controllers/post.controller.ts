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

  static async getUserPost(req: Request, res: Response) {
    const { u_id } = req.params;

    if (!u_id) {
      res.status(404).json({ message: "User profile not found" });
      return;
    }
    try {
      const data = await User.findOne({
        where: {
          id: u_id,
        },
        include: {
          model: Post,
        },
      });

      if (!data) {
        res.status(404).json({ messae: "The post of the user was not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "The user data fetching was successfull", data });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
      console.log("Error in the fetching of data for users", e);
      return;
    }
  }
}

export default PostController;
