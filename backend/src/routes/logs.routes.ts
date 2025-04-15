import Router = require("koa-router");
import { Log, LogModel } from "../models/Log";

const logRouter = new Router({ prefix: "/logs" });

logRouter.post("/store", async (ctx) => {
  try {
    const {
      timestamp,
      level,
      message,
      source,
      type,
      metadata,
      environment,
      userId,
    } = ctx.request.body as Log;

    // store
    const log = await LogModel.store({
      timestamp,
      level,
      message,
      source,
      type,
      metadata,
      environment,
      userId,
    });

    ctx.status = 201;
    ctx.body = log;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error storing log:", error);
  }
});

export default logRouter;
