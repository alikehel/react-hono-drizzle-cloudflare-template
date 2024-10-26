import { usersSelectSchema } from "@/db/schema";
import { usersParamsSchema } from "@/db/schema/users";
import { createRoute } from "@/lib/create-app";
import { NOT_FOUND, OK } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { z } from "@hono/zod-openapi";
import { objectToCamel } from "ts-case-convert";

export const getUsers = createRoute({
    route: {
        tags: ["Users"],
        method: "get",
        path: "/api/v1/users",
        summary: "Get all users",
        description: "Get all users",
        request: {
            query: z
                .object({
                    user_id: usersParamsSchema.shape.id.optional(),
                    first_name: usersParamsSchema.shape.firstName.optional(),
                    name: usersParamsSchema.shape.name.optional(),
                    email: usersParamsSchema.shape.email.optional(),
                    password: usersParamsSchema.shape.password.optional(),
                })
                .transform((data) => {
                    return objectToCamel(data);
                }),
        },
        responses: {
            [OK]: jsonContent(
                successResponseSchema(z.array(usersSelectSchema)),
                "Get all users",
            ),
            [NOT_FOUND]: jsonContent(errorResponseSchema, "No users found"),
        },
    },
    handler: async (c) => {
        const filters = c.req.valid("query");

        const users = await c.var.db.query.usersTable.findMany({
            where: (usersTable, { eq }) =>
                filters.userId ? eq(usersTable.id, filters.userId) : undefined,
        });

        c.var.logger.info("Users", users);

        if (users.length === 0) {
            return c.json(
                { success: false, error: "No users found" },
                NOT_FOUND,
            );
        }

        return c.json({ success: true, data: users }, OK);
    },
});
