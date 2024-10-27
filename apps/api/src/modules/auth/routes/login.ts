import { usersInsertSchema, usersSelectSchema } from "@/db/schema";
import { createRoute } from "@/lib/create-app";
import { OK, UNAUTHORIZED } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { createSession } from "../lib/create-session";
import { generateSessionToken } from "../lib/generate-session-token";
import { setSessionTokenCookie } from "../lib/set-session-token-cookie";

export const login = createRoute({
    route: {
        tags: ["Auth"],
        method: "post",
        path: "/api/v1/auth/login",
        summary: "Login",
        description: "Login",
        request: {
            body: jsonContent(
                usersInsertSchema.pick({
                    username: true,
                    password: true,
                }),
                "User",
            ),
        },
        responses: {
            [OK]: jsonContent(
                successResponseSchema(usersSelectSchema),
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
            where: (usersTable, { eq }) =>
                eq(usersTable.username, data.username),
        });

        if (!user) {
            return c.json(
                { success: false, message: "Invalid credentials" },
                UNAUTHORIZED,
            );
        }

        const token = generateSessionToken();
        const session = await createSession(db, token, user.id);

        setSessionTokenCookie(c, token, session.expiresAt);

        return c.json(
            {
                success: true,
                data: { ...user, token },
            },
            OK,
        );
    },
});
