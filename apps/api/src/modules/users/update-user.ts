import { usersInsertSchema, usersSelectSchema, usersTable } from "@/db/schema";
import { usersParamsSchema } from "@/db/schema/users";
import { createRoute } from "@/lib/create-app";
import { NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import { requestParamsSchema } from "@/lib/request-schemas";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

export const updateUser = createRoute({
    route: {
        tags: ["Users"],
        method: "patch",
        path: "/api/v1/users/{user_id}",
        summary: "Update user",
        description: "Update user by id",
        request: {
            params: requestParamsSchema(
                z.object({
                    user_id: usersParamsSchema.shape.id,
                }),
            ),
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
    },
    handler: async (c) => {
        const pathParams = c.req.valid("param");
        const data = c.req.valid("json");

        const [user] = await c.var.db
            .update(usersTable)
            .set({
                name: data.name,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
            })
            .where(eq(usersTable.id, pathParams.userId))
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
});
