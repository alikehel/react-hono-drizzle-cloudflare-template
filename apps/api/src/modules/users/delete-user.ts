import { usersSelectSchema, usersTable } from "@/db/schema";
import { NOT_FOUND, OK } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import type { AppRouteHandler } from "@/types/app-type";
import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

export const deleteUserRoute = createRoute({
    tags: ["Users"],
    method: "delete",
    path: "/api/v1/users/{userId}",
    summary: "Delete user",
    description: "Delete user by id",
    request: {
        params: z.object({
            userId: z.coerce.number(),
        }),
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
    const { userId } = c.req.valid("param");

    const [user] = await c.var.db
        .delete(usersTable)
        .where(eq(usersTable.id, userId))
        .returning();

    c.var.logger.info("User", user);

    if (!user) {
        return c.json({ success: false, error: "User not found" }, NOT_FOUND);
    }

    return c.json({ success: true, data: user }, OK);
};
