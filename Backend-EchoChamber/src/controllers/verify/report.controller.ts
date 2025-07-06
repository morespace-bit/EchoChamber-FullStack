import { Response } from "express";
import { ExtendedRequest } from "../../global/type";
import Post from "../../database/models/post.model";

class ReportController {
  static async addReport(req: ExtendedRequest, res: Response) {
    if (!req.user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const { postId } = req.params;
      const post = await Post.findByPk(postId);

      if (!post) {
        res.status(404).json({ message: "The post doesn't exist" });
        return;
      }

      await Post.increment("reports", {
        by: 1,
        where: {
          id: postId,
        },
      });

      const updatedReport = await Post.findByPk(postId);

      if (updatedReport?.reports == 10) {
        await Post.destroy({
          where: {
            id: postId,
          },
        });
        res
          .status(200)
          .json({ message: "The post was deleated as it reached 10 reports" });
        return;
      }

      res
        .status(201)
        .json({ message: "Added the report", reports: updatedReport?.reports });
    } catch (e) {
      console.log("Error");
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async removeReport(req: ExtendedRequest, res: Response) {
    if (!req.user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const { postId } = req.params;
      if (!postId) {
        res.status(400).json({ message: "The post does not exist" });
      }

      await Post.decrement("reports", { by: 1, where: { id: postId } });
      const updatedReport = await Post.findByPk(postId);

      res
        .status(201)
        .json({ message: "Reports removed ", reports: updatedReport?.reports });
    } catch (e) {
      console.log("Error", e);
      res.status(500).json({ message: "Error something went wrong" });
    }
  }
}

export default ReportController;
