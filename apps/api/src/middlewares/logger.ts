import { logger as pinoLogger } from "hono-pino";
// import pino from "pino";
// import pinoPretty from "pino-pretty";

// import env from "@/env";

export function logger() {
    return pinoLogger({
        http: {
            reqId: () => crypto.randomUUID(),
        },
    });
}
