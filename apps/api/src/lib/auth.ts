import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "../db/schema";

export const auth = (db: DrizzleD1Database<typeof schema>) => {
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
        }),
        user: {
            modelName: "usersTable",
            additionalFields: {
                firstName: "firstName",
            },
        },
        session: {
            modelName: "sessionsTable",
        },
        account: {
            modelName: "accountsTable",
        },
        emailAndPassword: {
            enabled: true,
        },
        advanced: {
            disableCSRFCheck: true,
        },
    });
};
