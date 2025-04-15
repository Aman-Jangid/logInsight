import Router = require("koa-router");
import authRouter from "./auth.routes";
import logRouter from "./logs.routes";

const router = new Router();

router.use("/auth", authRouter.routes());
router.use("/logs", logRouter.routes());

export default router;
