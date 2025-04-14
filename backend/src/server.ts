import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as json from "koa-json";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";

import "dotenv/config";
import knex from "knex";
import knexConfig from "../knexfile";
import router from "./routes/auth";

const app = new Koa();

// Middleware
app.use(json());
app.use(cors());
app.use(logger());
app.use(bodyParser());

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
