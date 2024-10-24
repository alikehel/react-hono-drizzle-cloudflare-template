import type { AppType } from "@/types/app-type";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";

export function configureOpenAPI(app: AppType) {
    app.doc("/api", {
        openapi: "3.0.0",
        info: {
            version: "0.0.0",
            title: "API",
        },
    });

    app.get("/swagger", swaggerUI({ url: "/api" }));

    app.get(
        "/scalar",
        apiReference({
            theme: "kepler",
            layout: "classic",
            defaultHttpClient: {
                targetKey: "javascript",
                clientKey: "fetch",
            },
            spec: {
                url: "/api",
            },
        }),
    );
}
