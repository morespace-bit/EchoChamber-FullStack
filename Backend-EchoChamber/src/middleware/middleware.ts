import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../global/type";

import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../database/models/user.model";
class Middleware {
  static async isLoggedIn(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Please provide token" });
      return;
    }
    try {
      const decoded = jwt.verify(token, "echochamber") as JwtPayload;
      const user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(403).json({ message: "user not found Invalid token" });
        return;
      }
      req.user = { id: decoded.id };
      next();
    } catch (e) {
      console.log("Error", e);
      res.status(401).json({ message: "jwt auth failed" });
    }
  }
}

export default Middleware;
