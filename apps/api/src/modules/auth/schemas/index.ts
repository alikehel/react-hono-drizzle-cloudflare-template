import { type User, usersTable } from "@/modules/users/schemas";
import type { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sessionsTable = sqliteTable("sessions", {
    id: text().primaryKey(),
    userId: int()
        .notNull()
        .references(() => usersTable.id),
    expiresAt: int({
        mode: "timestamp",
    }).notNull(),
});

export type Session = InferSelectModel<typeof sessionsTable>;

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };
