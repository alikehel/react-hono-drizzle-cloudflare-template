import type { AppType } from "@/types/app-type";

export function configureRoutes(app: AppType, routes: Array<AppType>) {
    for (const route of routes) {
        app.route("/", route);
    }
}
