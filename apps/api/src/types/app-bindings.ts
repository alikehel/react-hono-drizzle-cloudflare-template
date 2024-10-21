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
}
