import { Router } from "express";
import Middleware from "../middleware/middleware";
import PostController from "../controllers/post.controller";

const router: Router = Router();

router
  .route("/createPost")
  .post(Middleware.isLoggedIn, PostController.createPost);

router.route("/getAllPost").get(PostController.getAllPost);

router.route("/getUserPost/:u_id").get(PostController.getUserPost);

export default router;
