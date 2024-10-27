import { configureOpenAPI } from "./lib/configure-openapi";
import { configureAuthRoutes, configureRoutes } from "./lib/configure-routes";
import { createApp } from "./lib/create-app";
import { authRoutes } from "./modules/auth/routes";
import { usersRoutes } from "./modules/users";

// Create App

const app = createApp();

// Configure OpenAPI

configureOpenAPI(app);

// Configure Routes

configureAuthRoutes(app, [...authRoutes]);

configureRoutes(app, [...usersRoutes]);

// Export App

export default app;
