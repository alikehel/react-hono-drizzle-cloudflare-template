import { OpenAPIHono } from "@hono/zod-openapi";
import { drizzle } from "drizzle-orm/d1";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { usersTable } from "./db/schema";
import { logger } from "./middlewares/logger";
import { notFound } from "./middlewares/not-found";
import { onError } from "./middlewares/on-error";
import type { Bindings, Variables } from "./types/app-bindings";

const app = new OpenAPIHono<{
    Bindings: Bindings;
    Variables: Variables;
}>().basePath("/api/v1");

app.use(
    "*",
    cors({
        origin: (origin) => origin,
        allowHeaders: ["Content-Type"],
        allowMethods: ["*"],
        maxAge: 86400,
        credentials: true,
    }),
);

app.use(prettyJSON());

app.use(logger());

app.onError(onError);

app.notFound(notFound);

app.get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const users = await db.select().from(usersTable).all();
    c.var.logger.info("Users", users);
    console.log(users);
    return c.json(users);
});

export default app;
