import { CREATED, UNPROCESSABLE_ENTITY } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import {
    usersInsertSchema,
    usersSelectSchema,
    usersTable,
} from "@/modules/users/schemas";
import type { AppRouteHandler } from "@/types/app-type";
import { createRoute } from "@hono/zod-openapi";
import { createSession } from "../lib/create-session";
import { generateSessionToken } from "../lib/generate-session-token";
import { hashPassword } from "../lib/password";
import { setSessionTokenCookie } from "../lib/set-session-token-cookie";

export const registerRoute = createRoute({
    tags: ["Auth"],
    method: "post",
    path: "/api/v1/auth/register",
    summary: "Register",
    description: "Register",
    request: {
        body: jsonContent(usersInsertSchema, "User register"),
    },
    responses: {
        [CREATED]: jsonContent(
            successResponseSchema(usersSelectSchema),
            "User registered",
        ),
        [UNPROCESSABLE_ENTITY]: jsonContent(
            errorResponseSchema,
            "Validation error",
        ),
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

    if (user) {
        return c.json(
            {
                success: false,
                message: "User already exists",
            },
            UNPROCESSABLE_ENTITY,
        );
    }

    const [newUser] = await c.var.db
        .insert(usersTable)
        .values({
            username: data.username,
            // hash the password
            password: await hashPassword(
                data.password,
                new TextEncoder().encode(c.env.PASSWORD_SALT),
            ),
            firstName: data.firstName,
            lastName: data.lastName,
        })
        .returning();

    const token = generateSessionToken();
    const session = await createSession(db, token, newUser.id);

    setSessionTokenCookie(c, token, session.expiresAt);

    return c.json(
        {
            success: true,
            data: { ...newUser, token },
        },
        CREATED,
    );
};
