import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";

export const sessionsTable = sqliteTable("sessions", {
    id: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => usersTable.id),
    expiresAt: int({ mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});
