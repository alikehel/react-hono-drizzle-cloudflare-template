import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Bindings, Variables } from "./app-bindings";

export type AppType = OpenAPIHono<{
    Bindings: Bindings;
    Variables: Variables;
}>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    { Bindings: Bindings; Variables: Variables }
>;
