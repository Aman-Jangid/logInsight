import Router = require("koa-router");
import { Log, LogDTO, LogModel } from "../models/Log";
import { Context } from "koa";
import authMiddleware from "../middleware/authMiddleware";

const logRouter = new Router();

async function storeLog(data: LogDTO, ctx: Context): Promise<Log> {
  const { id } = ctx.state.user;
  return await LogModel.store(data, id);
}

logRouter.post("/", authMiddleware, async (ctx) => {
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

logRouter.get("/", authMiddleware, async (ctx) => {
  try {
    const data = await LogModel.fetchAll();
    ctx.body = data;
    ctx.status = 200;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error getting logs : ", error);
  }
});

logRouter.get("/:id", authMiddleware, async (ctx) => {
  try {
    const id = ctx.params.id;
    const data = await LogModel.fetchById(id);
    ctx.body = data;
    ctx.status = 200;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error getting log : ", error);
  }
});

logRouter.delete("/:id", authMiddleware, async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await LogModel.deleteById(id);
    ctx.body = res;
    ctx.status = 200;
    console.log(res);
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error deleting log : ", error);
  }
});

export default logRouter;
