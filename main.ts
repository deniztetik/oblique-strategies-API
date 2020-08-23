import { serve } from "https://deno.land/std/http/server.ts";
import * as flags from "https://deno.land/std/flags/mod.ts";

import OBLIQUE_STRATEGIES from "./OBLIQUE_STRATEGIES.ts";

const { args } = Deno;
const DEFAULT_PORT = 8080;
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.log("port is not a number");
  // exit(1);
}

const s = serve({ port });
console.log(`http://localhost:${port}`);

for await (const req of s) {
  // get random element from OBLIQUE_STRATEGIES array
  const strategy =
    OBLIQUE_STRATEGIES[Math.floor(Math.random() * OBLIQUE_STRATEGIES.length)];

  const body = JSON.stringify({ strategy });

  req.respond({ body });
}
