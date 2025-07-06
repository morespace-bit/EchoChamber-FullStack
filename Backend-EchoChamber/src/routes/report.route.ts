import { Router } from "express";
import ReportController from "../controllers/verify/report.controller";
import Middleware from "../middleware/middleware";

const router: Router = Router();

router
  .route("/addReport/:postId")
  .post(Middleware.isLoggedIn, ReportController.addReport);
router
  .route("/removeReport/:postId")
  .post(Middleware.isLoggedIn, ReportController.removeReport);

export default router;
