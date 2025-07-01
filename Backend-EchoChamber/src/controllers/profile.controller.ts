import { Request, Response } from "express";
import User from "../database/models/user.model";
import { ExtendedRequest } from "../global/type";

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
}

export default Profile;
