import type { PinoLogger } from "hono-pino";

export interface AppBindings {
    Variables: {
        logger: PinoLogger;
    };
    Env: {
        DB: D1Database;
    };
}

export interface Env {
    DB: D1Database;
}

export interface Variables {
    logger: PinoLogger;
}
