import { usersInsertSchema, usersSelectSchema, usersTable } from "@/db/schema";
import { createRoute } from "@/lib/create-app";
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

export const createUser = createRoute({
    route: {
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
    },
    handler: async (c) => {
        const data = c.req.valid("json");

        // random number to simulate a user being logged in
        if (Math.random() > 0.5) {
            return c.json(
                { success: false, message: "Unauthorized" },
                UNAUTHORIZED,
            );
        }

        const [user] = await c.var.db
            .insert(usersTable)
            .values({
                username: data.username,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            })
            .returning();

        return c.json({ success: true, data: user }, CREATED);
    },
});
