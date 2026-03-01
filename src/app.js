import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";

export const createApp = (pokiData) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (c, next) => {
    c.set("pokiData", pokiData);
    await next();
  });
  app.get("*", serveStatic({ root: "public" }));
  return app;
};

