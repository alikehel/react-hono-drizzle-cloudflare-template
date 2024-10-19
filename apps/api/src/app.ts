import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "./middlewares/logger";
import { notFound } from "./middlewares/not-found";
import { onError } from "./middlewares/on-error";
import type { AppBindings } from "./types/app-bindings";

const app = new OpenAPIHono<AppBindings>();

app.use(logger());

app.onError(onError);

app.notFound(notFound);

export default app;
