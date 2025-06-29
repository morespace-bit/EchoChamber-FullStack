import { Router } from "express";
import Profile from "../controllers/profile.controller";
import Middleware from "../middleware/middleware";

const router: Router = Router();

router
  .route("/createProfile")
  .post(Middleware.isLoggedIn, Profile.createProfile);

export default router;
