import { Hono } from "hono";
import { expensesRoute } from "./routes/expenses";
import { logger } from "hono/logger";


const app = new Hono();

app.use("*", logger());

// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });

// app.use("*", serveStatic({ root: "./frontend/dist" }));
// app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
