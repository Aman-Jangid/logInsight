import { Context, Next } from "koa";

export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      error: error.message || "Internal Server Error",
    };
    ctx.app.emit("error", error, ctx);
  }
};

// TODO: Add Custom Error Classes
