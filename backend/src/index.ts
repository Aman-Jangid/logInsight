import * as Koa from "koa";
import * as Router from "koa-router";

import * as bodyParser from "koa-bodyparser";
import * as json from "koa-json";
import * as logger from "koa-logger";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = "Koa server for logInsight!";
  await next();
});

// Middleware
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("logInsight server is running on http://localhost:3000");
});
