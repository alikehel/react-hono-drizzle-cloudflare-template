import { sessionsTable } from "@/db/schema";
import type * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export async function invalidateSession(
    db: DrizzleD1Database<typeof schema>,
    sessionId: string,
): Promise<void> {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}
