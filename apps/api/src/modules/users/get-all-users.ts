import { usersSelectSchema } from "@/db/schema";
import { createRouter } from "@/lib/create-app";
import { NOT_FOUND, OK } from "@/lib/http-status-codes";
import { jsonContent } from "@/lib/openapi-helpers";
import {
    errorResponseSchema,
    successResponseSchema,
} from "@/lib/response-schemas";
import { createRoute, z } from "@hono/zod-openapi";

export const getAllUsers = createRouter().openapi(
    createRoute({
        tags: ["Users"],
        method: "get",
        path: "/users",
        responses: {
            [OK]: jsonContent(
                successResponseSchema(z.array(usersSelectSchema)),
                "Get all users",
            ),
            [NOT_FOUND]: jsonContent(errorResponseSchema, "No users found"),
        },
    }),
    async (c) => {
        const users = await c.var.db.query.usersTable.findMany();
        c.var.logger.info("Users", users);
        if (users.length === 0) {
            return c.json(
                { success: false, error: "No users found" },
                NOT_FOUND,
            );
        }
        return c.json({ success: true, data: users }, OK);
    },
);
