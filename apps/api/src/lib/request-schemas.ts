import { type ObjectToCamel, objectToCamel } from "ts-case-convert";
import type { z } from "zod";

export function requestParamsSchema<T extends z.ZodTypeAny>(
    schema: T,
): z.ZodEffects<T, ObjectToCamel<z.infer<T>>> {
    return schema.transform(
        (data) => objectToCamel(data) as ObjectToCamel<z.infer<T>>,
    );
}
