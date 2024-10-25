import { usersInsertSchema, usersSelectSchema, usersTable } from "@/db/schema";
import { createRouter } from "@/lib/create-app";
import { NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

export const updateUser = createRouter().openapi(
    createRoute({
        tags: ["Users"],
        method: "patch",
        path: "/users/{userId}",
        summary: "Update user",
        description: "Update user by id",
        request: {
            params: z.object({
                userId: z.coerce.number(),
            }),
            body: jsonContent(usersInsertSchema, "User data"),
        },
        responses: {
            [OK]: jsonContent(
                successResponseSchema(usersSelectSchema),
                "User updated",
            ),
            [UNPROCESSABLE_ENTITY]: jsonContent(
                errorResponseSchema,
                "Validation error",
            ),
            [NOT_FOUND]: jsonContent(errorResponseSchema, "User not found"),
        },
    }),
    async (c) => {
        const { userId } = c.req.valid("param");
        const { name, email, password, firstName } = c.req.valid("json");

        const [user] = await c.var.db
            .update(usersTable)
            .set({
                name: name,
                email: email,
                password: password,
                firstName: firstName,
            })
            .where(eq(usersTable.id, userId))
            .returning();

        if (!user) {
            return c.json(
                { success: false, error: "User not found" },
                NOT_FOUND,
            );
        }

        c.var.logger.info("User", user);

        return c.json({ success: true, data: user }, OK);
    },
);
