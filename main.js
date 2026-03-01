import * as pokiesData from "./public/data/poki_data.json" with {type:"json"}
import { createApp } from "./src/app.js";

const main = () => {
  const app = createApp(pokiesData);
  Deno.serve(app.fetch);
}

main()