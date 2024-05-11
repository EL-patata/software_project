import { defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL as any,
    host: process.env.NEXTAUTH_URL,
  },
  tablesFilter: ["book-reader_*"],
});
