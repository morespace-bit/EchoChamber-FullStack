import { Response } from "express";
import { ExtendedRequest } from "../../global/type";

class Verify {
  static async verify(req: ExtendedRequest, res: Response) {
    if (!req.user?.id) {
      res.status(401).json({ message: "User has not loged in yet" });
      return;
    }

    res.status(200).json({ message: "User has already loged in" });
  }
}

export default Verify;
