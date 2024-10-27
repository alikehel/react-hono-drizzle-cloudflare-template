import { z } from "@hono/zod-openapi";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = sqliteTable("users", {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: int({ mode: "boolean" }).notNull().default(false),
    createdAt: int({ mode: "timestamp" }).$defaultFn(() => new Date()),
    updatedAt: int({ mode: "timestamp" })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
    password: text(),
    firstName: text(),
});

export const usersInsertSchema = createInsertSchema(usersTable).omit({
    id: true,
});

export const usersSelectSchema = createSelectSchema(usersTable);

export const usersParamsSchema = createSelectSchema(usersTable, {
    id: z.coerce.number(),
});
