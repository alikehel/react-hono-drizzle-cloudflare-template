import { hc } from "hono/client";
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

// Export App Type for Client

export type AppType = (typeof routes)[number];

// TODO: Remove later
const client = hc<AppType>("http://localhost:8787/");

// Export App

export default app;
