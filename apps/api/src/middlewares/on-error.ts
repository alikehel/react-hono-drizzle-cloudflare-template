import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import { INTERNAL_SERVER_ERROR, OK } from "../lib/http-status-codes.js";

const onError: ErrorHandler = (err, c) => {
    const currentStatus =
        "status" in err ? err.status : c.newResponse(null).status;
    const statusCode =
        currentStatus !== OK
            ? (currentStatus as StatusCode)
            : INTERNAL_SERVER_ERROR;
    const env = c.env?.ENV || c.env?.ENV;
    return c.json(
        {
            message: err.message,
            stack: env === "prod" ? undefined : err.stack,
        },
        statusCode,
    );
};

export default onError;
