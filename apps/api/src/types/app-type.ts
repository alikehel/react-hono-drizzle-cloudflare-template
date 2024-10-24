import type { OpenAPIHono } from "@hono/zod-openapi";
import type { Bindings, Variables } from "./app-bindings";

export type AppType = OpenAPIHono<{
    Bindings: Bindings;
    Variables: Variables;
}>;
