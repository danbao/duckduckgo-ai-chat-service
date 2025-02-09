import { Hono } from "jsr:@hono/hono";

import { chat } from "./src/api/chat.ts";
import { models } from "./src/api/models.ts";

import { auth } from "./src/auth.ts";
import { limit } from "./src/limit.ts";
import { cron } from "./src/cron.ts";

const app = new Hono();

auth(app);
limit(app);

chat(app);
models(app);

cron();

const host = Deno.env.get("HOST") || "127.0.0.1";
const port = parseInt(Deno.env.get("PORT") || "8888");

// 输出所有环境变量
console.log("\n当前环境变量配置：");
for (const [key, value] of Object.entries(Deno.env.toObject())) {
  console.log(`${key}: ${value}`);
}
console.log(`\n服务器启动于: http://${host}:${port}\n`);

Deno.serve({ port, hostname: host }, app.fetch);
