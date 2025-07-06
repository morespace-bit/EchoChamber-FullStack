import { Router } from "express";
import Verify from "../../controllers/verify/verify.controller";
import Middleware from "../../middleware/middleware";
const router: Router = Router();

router.route("/verify").get(Middleware.isLoggedIn, Verify.verify);

export default router;
