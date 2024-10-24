import { configureOpenAPI } from "./lib/configure-openapi";
import { configureRoutes } from "./lib/configure-routes";
import { createApp } from "./lib/create-app";
import { createUser } from "./modules/users/create-user";
import { getAllUsers } from "./modules/users/get-all-users";

const app = createApp();

configureOpenAPI(app);

configureRoutes(app, [getAllUsers, createUser]);

export default app;
