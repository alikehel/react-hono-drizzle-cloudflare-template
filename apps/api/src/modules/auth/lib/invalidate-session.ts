import type { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { sessionsTable } from "../schemas";

export async function invalidateSession(
    db: DrizzleD1Database<typeof schema>,
    sessionId: string,
): Promise<void> {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}
