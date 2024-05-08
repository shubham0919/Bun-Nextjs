import { Hono } from "hono";
import { expensesRoute } from "./routes/expenses";
import { logger } from "hono/logger";


const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// app.use("*", serveStatic({ root: "./frontend/dist" }));
// app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

app.route("/api/expenses", expensesRoute);

export default app;
