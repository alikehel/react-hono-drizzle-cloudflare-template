import { auth } from "./lib/auth";
import { configureOpenAPI } from "./lib/configure-openapi";
import { configureRoutes } from "./lib/configure-routes";
import { createApp } from "./lib/create-app";
import { usersRoutes } from "./modules/users";

// Create App

const app = createApp();

// Configure OpenAPI

configureOpenAPI(app);

// Configure Routes

const routes = [...usersRoutes] as const;

configureRoutes(app, [...routes]);

app.on(["POST", "GET"], "/api/auth/**", (c) => {
    const authInstance = auth(c.var.db);
    return authInstance.handler(c.req.raw);
});

// Export App

export default app;
