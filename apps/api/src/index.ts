import { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import { HTTPException } from "hono/http-exception";
import { notFound, onError } from "./middlewares";
import { logger } from "./middlewares/logger";

interface AppBindings {
    Variables: {
        logger: PinoLogger;
    };
}

const app = new OpenAPIHono<AppBindings>();

// app.use(logger());

app.get("/", (c) => {
    c.var.logger.warn("Hello, World!");
    return c.json({ message: "Hello, World!" });
});

app.get("/error", (c) => {
    throw new Error("This is an error");
});

app.get("/error-async", async (c) => {
    throw new Error("This is an async error");
});

app.get("/error-async-promise", async (c) => {
    return new Promise((_, reject) => {
        reject(new Error("This is an async promise error"));
    });
});

app.get("/http-error", async (c) => {
    throw new HTTPException(404);
});

app.onError(onError);

app.notFound(notFound);

export default app;
