import type { schema } from "@/db/schema";
import type { User } from "@/modules/users/schemas";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { PinoLogger } from "hono-pino";

export interface Bindings {
    DB: D1Database;
    ENV: "prod" | "dev" | "test" | "stage";
    LOG_LEVEL: string;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_DATABASE_ID: string;
    CLOUDFLARE_D1_TOKEN: string;
}

export interface Variables {
    logger: PinoLogger;
    db: DrizzleD1Database<typeof schema> & {
        $client: D1Database;
    };
    user: User & {
        sessionId: string;
    };
}
