import { isLoggedIn } from "@/middlewares/is-logged-in";
import type { AppType } from "@/types/app-type";

export function configureRoutes(app: AppType, routes: Array<AppType>) {
    for (const route of routes) {
        app.route("/", route);
    }
}

export function configureAuthRoutes(app: AppType, routes: Array<AppType>) {
    for (const route of routes) {
        app.route("/", route);
    }
    app.use(isLoggedIn());
}
