import { NOT_FOUND } from "@/lib/http-status-codes";
import type { Bindings, Variables } from "@/types/app-bindings";
import type { NotFoundHandler } from "hono";

export const notFound: NotFoundHandler<{
    Bindings: Bindings;
    Variables: Variables;
}> = (c) => {
    c.var.logger.error(`Route not found: ${c.req.url}`);
    return c.json(
        {
            success: false,
            error: `Route not found: ${c.req.url}`,
        },
        NOT_FOUND,
    );
};
