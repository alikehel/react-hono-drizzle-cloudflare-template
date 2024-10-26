import { db } from "@/middlewares/db";
import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import { serveEmojiFavicon } from "@/middlewares/serve-emoji-favicon";
import type { Bindings, Variables } from "@/types/app-bindings";
import type { AppRouteHandler } from "@/types/app-type";
import { OpenAPIHono, type RouteConfig } from "@hono/zod-openapi";
import { createRoute as createHonoRoute } from "@hono/zod-openapi";
import type { MiddlewareHandler } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import defaultHook from "./default-hook";

export const createRouter = () => {
    return new OpenAPIHono<{
        Bindings: Bindings;
        Variables: Variables;
    }>({ defaultHook: defaultHook });
};

export const createRoute = <T extends RouteConfig>(data: {
    route: T;
    middlewares?: MiddlewareHandler[];
    handler: AppRouteHandler<T>;
}) => {
    return createRouter().openapi(
        createHonoRoute({ ...data.route, middleware: data.middlewares }),
        data.handler as unknown as AppRouteHandler<
            ReturnType<typeof createHonoRoute>
        >,
    );
};

export const createApp = () => {
    const app = createRouter();

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

    app.use(db());

    return app;
};
