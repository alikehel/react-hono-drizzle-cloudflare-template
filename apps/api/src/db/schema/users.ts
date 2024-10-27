import { z } from "@hono/zod-openapi";
import type { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    firstName: text().notNull(),
});

export type User = InferSelectModel<typeof usersTable>;

export const usersInsertSchema = createInsertSchema(usersTable).omit({
    id: true,
});

export const usersSelectSchema = createSelectSchema(usersTable);

export const usersParamsSchema = createSelectSchema(usersTable, {
    id: z.coerce.number(),
});
