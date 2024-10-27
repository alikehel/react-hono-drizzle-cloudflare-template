import { usersSelectSchema } from "@/db/schema";
import { createRoute } from "@/lib/create-app";
import { OK, UNAUTHORIZED } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { z } from "@hono/zod-openapi";
import { setCookie } from "hono/cookie";
import { createSession } from "../lib/create-session";
import { generateSessionToken } from "../lib/generate-session-token";

export const login = createRoute({
    route: {
        tags: ["Auth"],
        method: "post",
        path: "/api/v1/auth/login",
        summary: "Login",
        description: "Login",
        request: {
            body: jsonContent(
                usersSelectSchema.pick({
                    id: true,
                }),
                "User",
            ),
        },
        responses: {
            [OK]: jsonContent(
                successResponseSchema(
                    z.object({ ...usersSelectSchema.shape, token: z.string() }),
                ),
                "User logged in",
            ),
            [UNAUTHORIZED]: jsonContent(
                errorResponseSchema,
                "Invalid credentials",
            ),
        },
    },
    handler: async (c) => {
        const data = c.req.valid("json");
        const db = c.var.db;

        const user = await c.var.db.query.usersTable.findFirst({
            where: (usersTable, { eq }) => eq(usersTable.id, data.id),
        });

        if (!user) {
            return c.json(
                { success: false, message: "Invalid credentials" },
                UNAUTHORIZED,
            );
        }

        const token = generateSessionToken();
        const session = await createSession(db, token, data.id);
        // response.headers.add(
        // 	"Set-Cookie",
        // 	`session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`
        // );
        setCookie(c, "session", token, {
            httpOnly: true,
            sameSite: "Lax",
            expires: session.expiresAt,
            path: "/",
        });

        return c.json(
            {
                success: true,
                data: { ...user, token },
            },
            OK,
        );
    },
});
