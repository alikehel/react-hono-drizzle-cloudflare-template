import { db } from "@/middlewares/db";
import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import { serveEmojiFavicon } from "@/middlewares/serve-emoji-favicon";
import type { Bindings, Variables } from "@/types/app-bindings";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

export const createRouter = () => {
    return new OpenAPIHono<{
        Bindings: Bindings;
        Variables: Variables;
    }>();
};

// export const createRoute = (data: {
//     route: RouteConfig;
//     handler: RouteHandler<
//         RouteConfig,
//         { Bindings: Bindings; Variables: Variables },
//         Input,
//     >;
// }) => {
//     return createRouter().openapi(createHonoRoute(data.route), data.handler);
// };

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
