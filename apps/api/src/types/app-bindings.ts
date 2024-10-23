import type * as schema from "@/db/schema";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { PinoLogger } from "hono-pino";

export interface Bindings {
    DB: D1Database;
    ENV: string;
    LOG_LEVEL: string;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_DATABASE_ID: string;
    CLOUDFLARE_D1_TOKEN: string;
    AUTH_SECRET: string;
}

export interface Variables {
    logger: PinoLogger;
    db: DrizzleD1Database<typeof schema> & {
        $client: D1Database;
    };
}
