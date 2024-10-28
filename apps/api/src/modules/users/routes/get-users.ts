import { NOT_FOUND, OK } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import { requestParamsSchema } from "@/lib/request-schemas";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { usersParamsSchema, usersSelectSchema } from "@/modules/users/schemas";
import type { AppRouteHandler } from "@/types/app-type";
import { createRoute, z } from "@hono/zod-openapi";

export const getUsersRoute = createRoute({
    tags: ["Users"],
    method: "get",
    path: "/api/v1/users",
    summary: "Get all users",
    description: "Get all users",
    request: {
        query: requestParamsSchema(
            z.object({
                user_id: usersParamsSchema.shape.id.optional(),
                first_name: usersParamsSchema.shape.firstName.optional(),
                last_name: usersParamsSchema.shape.lastName.optional(),
            }),
        ),
    },
    responses: {
        [OK]: jsonContent(
            successResponseSchema(z.array(usersSelectSchema)),
            "Get all users",
        ),
        [NOT_FOUND]: jsonContent(errorResponseSchema, "No users found"),
    },
});

export const getUsersHandler: AppRouteHandler<typeof getUsersRoute> = async (
    c,
) => {
    const queryParams = c.req.valid("query");

    const users = await c.var.db.query.usersTable.findMany({
        where: (usersTable, { eq }) =>
            queryParams.userId
                ? eq(usersTable.id, queryParams.userId)
                : undefined,
    });

    if (users.length === 0) {
        return c.json({ success: false, message: "No users found" }, NOT_FOUND);
    }

    return c.json({ success: true, data: users }, OK);
};
