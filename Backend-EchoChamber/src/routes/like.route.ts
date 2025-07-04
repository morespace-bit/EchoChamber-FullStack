import { Router } from "express";
import Middleware from "../middleware/middleware";
import LikeController from "../controllers/like.controller";

const router: Router = Router();

router
  .route("/like/:postId")
  .post(Middleware.isLoggedIn, LikeController.addLike);
router
  .route("/unlike/:postId")
  .post(Middleware.isLoggedIn, LikeController.removeLike);

export default router;
