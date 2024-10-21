import Credentials from "@auth/core/providers/credentials";
import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
    type AuthConfig,
    authHandler,
    initAuthConfig,
    verifyAuth,
} from "@hono/auth-js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import type { Context } from "hono";
import { cors } from "hono/cors";
import {
    accountsTable,
    sessionsTable,
    usersTable,
    verificationTokensTable,
} from "./db/schema";
import { logger } from "./middlewares/logger";
import { notFound } from "./middlewares/not-found";
import { onError } from "./middlewares/on-error";
import type { Env } from "./types/app-bindings";

const app = new OpenAPIHono<{ Bindings: Env }>({ strict: false }).basePath("/");

app.use(logger());

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

app.onError(onError);

app.notFound(notFound);

app.use("*", initAuthConfig(getAuthConfig));

app.use("/api/auth/*", authHandler());

app.use("/api/*", verifyAuth());

app.get("/api/protected", (c) => {
    const auth = c.get("authUser");
    return c.json(auth);
});

function getAuthConfig(c: Context<{ Bindings: Env }>): AuthConfig {
    const db = drizzle(c.env.DB);
    return {
        basePath: "/api/auth",
        secret: c.env.AUTH_SECRET,
        providers: [
            GitHub({
                clientId: "c.env.GITHUB_ID",
                clientSecret: "c.env.GITHUB_SECRET",
            }),
            Credentials({
                credentials: {
                    email: { label: "Email" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials) {
                    const response = await db
                        .select()
                        .from(usersTable)
                        .where(
                            eq(usersTable.email, credentials.email as string),
                        )
                        .all();
                    // if (!response.ok) return null;
                    return response[0] ?? null;
                },
            }),
        ],
        adapter: DrizzleAdapter(db, {
            usersTable,
            accountsTable,
            sessionsTable,
            verificationTokensTable,
        }),
    };
}

app.get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const users = await db.select().from(usersTable).all();
    console.log(users);
    return c.json(users);
});

export default app;
