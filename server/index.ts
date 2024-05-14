import app from "./src/app";

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT,
});

console.log(`Server running at port ${process.env.PORT}`);
