import { OpenAPIHono } from "@hono/zod-openapi";
import { drizzle } from "drizzle-orm/d1";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import * as schema from "./db/schema";
import { usersTable } from "./db/schema";
import { notFound } from "./middlewares/not-found";
import { onError } from "./middlewares/on-error";
import { pinoLogger } from "./middlewares/pino-logger";
import { serveEmojiFavicon } from "./middlewares/serve-emoji-favicon";
import type { Bindings, Variables } from "./types/app-bindings";

const app = new OpenAPIHono<{
    Bindings: Bindings;
    Variables: Variables;
}>();

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

app.use(serveEmojiFavicon("🚀"));

app.use(prettyJSON());

app.use(pinoLogger());

app.onError(onError);

app.notFound(notFound);

app.get("/", async (c) => {
    const db = drizzle(c.env.DB, {
        schema: schema,
        logger: true,
    });
    const randomUser = `User ${Math.floor(Math.random() * 1000)}`;
    await db.insert(usersTable).values({
        name: randomUser,
        email: `${randomUser.replace(/\s/g, "")}@example.com`,
        password: "password",
    });
    const users = await db.query.usersTable.findMany();
    c.var.logger.info("Users", users);
    return c.json(users);
});

export default app;
