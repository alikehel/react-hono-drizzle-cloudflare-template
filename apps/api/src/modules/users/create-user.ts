import { usersInsertSchema, usersSelectSchema, usersTable } from "@/db/schema";
import { createRouter } from "@/lib/create-app";
import {
    CREATED,
    UNAUTHORIZED,
    UNPROCESSABLE_ENTITY,
} from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { createRoute } from "@hono/zod-openapi";

export const createUser = createRouter().openapi(
    createRoute({
        tags: ["Users"],
        method: "post",
        path: "/api/v1/users",
        summary: "Create user",
        description: "Create a new user",
        request: {
            body: jsonContent(usersInsertSchema, "User data"),
        },
        responses: {
            [CREATED]: jsonContent(
                successResponseSchema(usersSelectSchema),
                "User created",
            ),
            [UNAUTHORIZED]: jsonContent(errorResponseSchema, "Unauthorized"),
            [UNPROCESSABLE_ENTITY]: jsonContent(
                errorResponseSchema,
                "Validation error",
            ),
        },
    }),
    async (c) => {
        const { name, email, password, firstName } = c.req.valid("json");

        // random number to simulate a user being logged in
        if (Math.random() > 0.5) {
            return c.json(
                { success: false, error: "Unauthorized" },
                UNAUTHORIZED,
            );
        }

        const [user] = await c.var.db
            .insert(usersTable)
            .values({
                name: name,
                email: email,
                password: password,
                firstName: firstName,
            })
            .returning();

        c.var.logger.info("User", user);

        return c.json({ success: true, data: user }, CREATED);
    },
);
