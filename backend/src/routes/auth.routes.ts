import Router = require("koa-router");
import { UserModel } from "../models/User";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const authRouter = new Router();

authRouter.post("/register", async (ctx) => {
  try {
    const { email, name, password } = ctx.request.body as {
      email: string;
      name: string;
      password: string;
    };

    if (!validateEmail(email)) {
      ctx.throw(400, "Invalid email format");
    }

    if (!email || !name || !password) {
      ctx.status = 400;
      ctx.body = { error: "Missing required fields" };
      return;
    }
    const user = await UserModel.create({ email, name, password });

    ctx.status = 201;
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      is_verified: user.is_verified,
      message:
        "Registration successful. Please check your email to verify your account.",
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error during registration:", error);
  }
});

authRouter.post("/login", async (ctx) => {
  try {
    const { email, password } = ctx.request.body as {
      email: string;
      password: string;
    };

    if (!validateEmail(email)) {
      ctx.throw(400, "Invalid email format");
    }

    if (!email || !password) {
      ctx.status = 400;
      ctx.body = { error: "Missing required fields" };
      return;
    }

    const user = await UserModel.findByEmail(email);
    if (!user) ctx.throw(404, "User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) ctx.throw(401, "Invalid Credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    ctx.status = 200;
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: error.message || "Internal Server Error" };
    console.error("Error trying to login:", error);
  }
});

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function authMiddleware(ctx: any, next: () => Promise<any>) {
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

// example protected route - testing validation using jwt token
authRouter.get("/profile", authMiddleware, async (ctx) => {
  try {
    if (!ctx.state.user || !ctx.state.user.email) {
      ctx.status = 401;
      ctx.body = { error: "Invalid token payload" };
      return;
    }

    const user = await UserModel.findByEmail(ctx.state.user.email);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: "User not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      is_verified: user.is_verified,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
    console.error("Error trying to access /profile", error);
  }
});

export default authRouter;
