import type { ZodSchema } from "@/types/zod-schema";
import { z } from "@hono/zod-openapi";

export const successResponseSchema = <T extends ZodSchema>(data: T) => {
    return z.object({
        success: z.boolean(),
        data,
    });
};

export const errorResponseSchema = z.object({
    success: z.boolean(),
    error: z.string(),
});
