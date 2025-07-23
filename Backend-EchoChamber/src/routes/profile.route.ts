import { Router } from "express";
import Profile from "../controllers/profile.controller";
import Middleware from "../middleware/middleware";

const router: Router = Router();

router
  .route("/createProfile")
  .post(Middleware.isLoggedIn, Profile.createProfile);

router.route("/getProfile").get(Middleware.isLoggedIn, Profile.getProfile);

router.route("/getUserProfile/:u_id").get(Profile.getUserProfile);

router.route("/search").get(Profile.searchUser);

export default router;
