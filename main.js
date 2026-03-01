import * as pokiData from "./public/data/poki_data.json" with {type:"json"}
import { createApp } from "./src/app.js";

const main = () => {
  const app = createApp(pokiData);
  Deno.serve(app.fetch);
}

main()