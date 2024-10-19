import { OpenAPIHono } from "@hono/zod-openapi";
import { drizzle } from "drizzle-orm/d1";
import { usersTable } from "./db/schema";
import { logger } from "./middlewares/logger";
import { notFound } from "./middlewares/not-found";
import { onError } from "./middlewares/on-error";
import type { Env } from "./types/app-bindings";

const app = new OpenAPIHono<{ Bindings: Env }>();

app.use(logger());

app.onError(onError);

app.notFound(notFound);

app.get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const users = await db.select().from(usersTable).all();
    console.log(users);
    return c.json(users);
});

export default app;
