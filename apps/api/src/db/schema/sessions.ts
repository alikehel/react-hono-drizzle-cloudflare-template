import type { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";

export const sessionsTable = sqliteTable("session", {
    id: text("id").primaryKey(),
    userId: int("user_id")
        .notNull()
        .references(() => usersTable.id),
    expiresAt: int("expires_at", {
        mode: "timestamp",
    }).notNull(),
});

export type Session = InferSelectModel<typeof sessionsTable>;
