import { UNAUTHORIZED } from "@/lib/http-status-codes";
import { validateSessionToken } from "@/modules/auth/lib/validate-session-token";
import type { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

export const isLoggedIn = (): MiddlewareHandler => {
    return async (c, next) => {
        const session = getCookie(c, "session");

        if (!session) {
            return c.json(
                { success: false, message: "Not logged in" },
                UNAUTHORIZED,
            );
        }

        const { session: sessionData, user } = await validateSessionToken(
            c.var.db,
            session,
        );

        if (!sessionData || !user) {
            return c.json(
                { success: false, message: "Not logged in" },
                UNAUTHORIZED,
            );
        }

        c.set("user", user);

        return next();
    };
};
