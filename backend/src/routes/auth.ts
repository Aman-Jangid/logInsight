import Router = require("koa-router");
import { UserModel } from "../models/User";

const router = new Router({ prefix: "/auth" });

router.post("/register", async (ctx) => {
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

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default router;
