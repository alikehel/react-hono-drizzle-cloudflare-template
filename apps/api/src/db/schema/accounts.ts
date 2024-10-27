import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";

export const accountsTable = sqliteTable("accounts", {
    id: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => usersTable.id),
    accountId: int().notNull(),
    providerId: int().notNull(),
});
