import { serve } from "bun";
import app from "./src/app";

serve({
  fetch: app.fetch,
  port: process.env.PORT,
});

console.log(`Server running at port ${process.env.PORT}`);
