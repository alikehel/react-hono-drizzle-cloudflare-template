// import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./src/db/migrations",
    schema: "./src/db/schema/index.ts",
    dialect: "sqlite",
    driver: "d1-http",
    verbose: true,
    strict: true,
    casing: "snake_case",
    dbCredentials: {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        token: process.env.CLOUDFLARE_D1_TOKEN!,
    },
});
