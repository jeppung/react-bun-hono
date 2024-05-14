import { Hono } from "hono";
import { logger } from "hono/logger";
import expenses from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Middleware
app.use("*", logger());

// Routes
app.get("/ping", (c) =>
  c.json({
    message: "ping",
  })
);
app.route("/api/expenses", expenses);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
