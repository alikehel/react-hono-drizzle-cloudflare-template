import { NOT_FOUND, OK } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import { requestParamsSchema } from "@/lib/request-schemas";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { usersSelectSchema, usersTable } from "@/modules/users/schemas";
import { usersParamsSchema } from "@/modules/users/schemas";
import type { AppRouteHandler } from "@/types/app-type";
import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

export const deleteUserRoute = createRoute({
    tags: ["Users"],
    method: "delete",
    path: "/api/v1/users/{user_id}",
    summary: "Delete user",
    description: "Delete user by id",
    request: {
        params: requestParamsSchema(
            z.object({
                user_id: usersParamsSchema.shape.id,
            }),
        ),
    },
    responses: {
        [OK]: jsonContent(
            successResponseSchema(usersSelectSchema),
            "Delete user",
        ),
        [NOT_FOUND]: jsonContent(errorResponseSchema, "User not found"),
    },
});

export const deleteUserHandler: AppRouteHandler<
    typeof deleteUserRoute
> = async (c) => {
    const pathParams = c.req.valid("param");

    const [user] = await c.var.db
        .delete(usersTable)
        .where(eq(usersTable.id, pathParams.userId))
        .returning();

    if (!user) {
        return c.json({ success: false, message: "User not found" }, NOT_FOUND);
    }

    return c.json({ success: true, data: user }, OK);
};
