import type { Session, User } from "@/db/schema";

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };
