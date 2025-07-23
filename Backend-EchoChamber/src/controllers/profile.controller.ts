import { Request, Response } from "express";
import User from "../database/models/user.model";
import { ExtendedRequest } from "../global/type";
import Post from "../database/models/post.model";
import { Op } from "sequelize";

class Profile {
  static async createProfile(req: ExtendedRequest, res: Response) {
    const id = req.user?.id;
    if (!id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!req.body) {
      res.status(400).json({ message: "Request body is undefined" });
      return;
    }

    const { username, profile } = req.body;

    if (!username || !profile) {
      res.status(400).json({ message: "Username and profile not provided" });
      return;
    }
    try {
      await User.update(
        { username, profile },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).json({ message: "User profile setup succesfully" });
      return;
    } catch (e) {
      console.log("Error", e);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: ExtendedRequest, res: Response) {
    const id = req.user?.id;
    if (!id) {
      res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const user = await User.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "username", "profile"],
      });
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "User profile fetched succesfully", data: user });

      return;
    } catch (e) {
      console.log("Error in data getting", e);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // to get the user profile based on the id passed through the params

  static async getUserProfile(req: Request, res: Response) {
    const { u_id } = req.params;

    try {
      const data = await User.findOne({
        where: {
          id: u_id,
        },

        attributes: ["id", "username", "profile"],
        include: { model: Post },
      });

      if (!data?.username) {
        res
          .status(404)
          .json({ message: "The requested user profile was not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "fetching of user data successfull", data });
    } catch (e) {
      res.status(500).json({ message: "There was internal server error" });
      console.log("There was error when fetching user profile", e);
    }
  }

  // search user profile

  static async searchUser(req: Request, res: Response) {
    if (!req.query.search) {
      res.status(400).json({ message: "please enter a valid search term" });
      return;
    }

    const { search } = req.query;

    try {
      const users = await User.findAll({
        where: {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        attributes: ["id", "username", "profile"],
      });

      if (users.length != 0) {
        res.status(200).json({ message: "Users found", data: users });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      res.status(500).json({ messaeg: "Internal server error" });
      console.error("Error while seraching user profle", e);
    }
  }
}

export default Profile;
