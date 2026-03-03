import { Hono } from "hono";
import { logger } from "hono/logger";
import {Eta} from "eta"
import { serveStatic } from "hono/deno";
export const createApp = (pokiesData) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (c, next) => {
    c.set("pokiesData", pokiesData);
    await next();
  });
  app.get("/", serveIndexPage);
  app.get("/:type", serveIndexPage);
  app.get("*", serveStatic({root:'public'}));
  return app;
};

const getPokiTypes = (pokiesData) => {
  const types = new Set();
  pokiesData.forEach(pokiData => {
    pokiData.types.forEach(type => {
      types.add(type)
    });
  });
  return [...types]
}


const serveIndexPage = (c) => {
  const type = c.req.param("type")
  console.log({type})
  const pokiesData = c.get("pokiesData");
  const pokiTypes = getPokiTypes(pokiesData);
  const eta = new  Eta({views:"public/templates"});
  const indexPage = eta.render("./index.eta",{pokiTypes,pokiesData, type});
  return c.html(indexPage);
}
