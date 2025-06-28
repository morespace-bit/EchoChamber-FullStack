import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../database/models/user.model";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ message: "Please send data" });
      return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Please provide both email and password" });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(400).json({ message: "User already exists Please log in" });
      return;
    }

    try {
      await User.create({
        email,
        password: await bcrypt.hash(password, 12),
      });

      res.status(200).json({ message: "The user was reginstred successfully" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default AuthController;
