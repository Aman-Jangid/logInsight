import { Context } from "vm";
import * as jwt from "jsonwebtoken";

export default async function authMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: "No token provided" };
    return;
  }

  if (!process.env.JWT_SECRET) {
    ctx.status = 500;
    ctx.body = { error: "JWT_SECRET environment variable is not set" };
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    ctx.state.user = decoded;
    await next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      ctx.status = 401;
      ctx.body = { error: "Expired token" };
    } else if (error.name === "JsonWebTokenError") {
      ctx.status = 401;
      ctx.body = { error: "Invalid token" };
    } else {
      ctx.status = 401;
      ctx.body = { error: "Unknown JWT Error" };
    }
  }
}
