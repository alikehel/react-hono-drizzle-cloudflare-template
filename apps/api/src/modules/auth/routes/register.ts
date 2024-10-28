import {} from "@/lib/http-status-codes";
import { OK, UNAUTHORIZED } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { usersInsertSchema, usersSelectSchema } from "@/modules/users/schemas";
import type { AppRouteHandler } from "@/types/app-type";
import { createRoute } from "@hono/zod-openapi";
import { createSession } from "../lib/create-session";
import { generateSessionToken } from "../lib/generate-session-token";
import { setSessionTokenCookie } from "../lib/set-session-token-cookie";

export const registerRoute = createRoute({
    tags: ["Auth"],
    method: "post",
    path: "/api/v1/auth/register",
    summary: "Register",
    description: "Register",
    request: {
        body: jsonContent(
            usersInsertSchema.pick({
                username: true,
                password: true,
            }),
            "User register",
        ),
    },
    responses: {
        [OK]: jsonContent(
            successResponseSchema(usersSelectSchema),
            "User logged in",
        ),
        [UNAUTHORIZED]: jsonContent(errorResponseSchema, "Invalid credentials"),
    },
});

export const registerHandler: AppRouteHandler<typeof registerRoute> = async (
    c,
) => {
    const data = c.req.valid("json");
    const db = c.var.db;

    const user = await c.var.db.query.usersTable.findFirst({
        where: (usersTable, { eq }) => eq(usersTable.username, data.username),
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
};
