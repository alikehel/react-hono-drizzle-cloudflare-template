import { z } from "@hono/zod-openapi";
import type { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    username: text().notNull().unique(),
    password: text().notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
});

export type User = Pick<
    InferSelectModel<typeof usersTable>,
    "id" | "username" | "firstName" | "lastName"
>;

export const usersInsertSchema = createInsertSchema(usersTable).omit({
    id: true,
});

export const usersSelectSchema = createSelectSchema(usersTable).pick({
    password: true,
});

export const usersParamsSchema = createSelectSchema(usersTable, {
    id: z.coerce.number(),
}).omit({
    password: true,
});
