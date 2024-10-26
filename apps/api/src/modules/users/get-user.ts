import { usersSelectSchema } from "@/db/schema";
import { usersParamsSchema } from "@/db/schema/users";
import { createRouter } from "@/lib/create-app";
import { NOT_FOUND, OK } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { createRoute, z } from "@hono/zod-openapi";

export const getUser = createRouter().openapi(
    createRoute({
        tags: ["Users"],
        method: "get",
        path: "/api/v1/users/{userId}",
        summary: "Get user",
        description: "Get user by id",
        request: {
            params: z.object({
                userId: usersParamsSchema.shape.id,
            }),
        },
        responses: {
            [OK]: jsonContent(
                successResponseSchema(usersSelectSchema),
                "Get user",
            ),
            [NOT_FOUND]: jsonContent(errorResponseSchema, "User not found"),
        },
    }),
    async (c) => {
        const { userId } = c.req.valid("param");

        const user = await c.var.db.query.usersTable.findFirst({
            where: (usersTable, { eq }) => eq(usersTable.id, userId),
        });

        c.var.logger.info("User", user);

        if (!user) {
            return c.json(
                { success: false, error: "User not found" },
                NOT_FOUND,
            );
        }

        return c.json({ success: true, data: user }, OK);
    },
);
