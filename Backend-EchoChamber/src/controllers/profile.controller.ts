import { Request, Response } from "express";
import User from "../database/models/user.model";

class Profile {
  static async createProfile(req: Request, res: Response) {
    const id = 1;
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
}
