import { hc } from "hono/client";
import { configureOpenAPI } from "./lib/configure-openapi";
import { configureRoutes } from "./lib/configure-routes";
import { createApp } from "./lib/create-app";
import { createUser } from "./modules/users/create-user";
import { getAllUsers } from "./modules/users/get-all-users";

const routes = [getAllUsers, createUser] as const;

const app = createApp();

configureOpenAPI(app);

configureRoutes(app, [...routes]);

export type AppType = (typeof routes)[number];

// TODO: Remove later
const client = hc<AppType>("http://localhost:8787/");

export default app;
