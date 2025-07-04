import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../database/models/user.model";

class AuthController {
  // for regestring the user
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
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.status(400).json({ message: "User already exists Please log in" });
      return;
    }

    try {
      const newUser = await User.create({
        email,
        password: await bcrypt.hash(password, 12),
      });

      const token = jwt.sign({ id: newUser.id }, "echochamber", {
        expiresIn: "30d",
      });

      res
        .status(201)
        .json({ message: "The user was reginstred successfully", token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // login feature using jwt

  static async loginUser(req: Request, res: Response) {
    if (!req.body) {
      res.json({ message: "Request body is empty" });
      return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    try {
      // checking if the user is already registred in or not

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        res
          .status(401)
          .json({ message: "User not found Please register yourself" });
        return;
      }

      const isPassValid = await bcrypt.compare(password, user.password);

      if (isPassValid) {
        const token = jwt.sign({ id: user.id }, "echochamber", {
          expiresIn: "30d",
        }); // the echo chamber is the secret key that signs this

        res.status(200).json({ message: "Login successfull", token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } catch (e) {
      console.log("Error", e);
      res.status(500).json({ message: "internal server error" });
    }
  }
}

export default AuthController;
