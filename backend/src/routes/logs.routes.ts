import Router = require("koa-router");
import { Log, LogDTO, LogModel } from "../models/Log";
import { Context } from "koa";
import { UserModel } from "../models/User";
import authMiddleware from "../middleware/authMiddleware";

const logRouter = new Router();

async function storeLog(data: LogDTO, ctx: Context): Promise<Log> {
  const { id } = ctx.state.user;
  return await LogModel.store(data, id);
}

logRouter.post("/log", authMiddleware, async (ctx) => {
  try {
    const data = ctx.request.body as Log;

    // store
    const log = await storeLog(data, ctx);

    ctx.status = 201;
    ctx.body = log;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error storing log:", error);
  }
});

export default logRouter;
