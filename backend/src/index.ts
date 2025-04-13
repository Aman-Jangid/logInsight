import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as json from "koa-json";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";

import "dotenv/config";
import { UserModel } from "./models/User";
import knex from "knex";
import knexConfig from "../knexfile";

const app = new Koa();
const router = new Router();

// Middleware
app.use(json());
app.use(cors());
app.use(logger());
app.use(bodyParser());

router.get("/", async (ctx, next) => {
  ctx.body = "Koa server for logInsight!";
  await next();
});

// register user route
router.post("/register", async (ctx) => {
  try {
    const { name, email, password } = ctx.request.body as {
      name: string;
      email: string;
      password: string;
    };

    const user = await UserModel.create({ name, email, password });
    ctx.status = 201;
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
});

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

const knexInstance = knex(knexConfig);
// test db connection
(async () => {
  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

export default app;
