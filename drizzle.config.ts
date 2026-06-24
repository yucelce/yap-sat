import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // sqlite yerine postgresql
  dbCredentials: {
    url: process.env.POSTGRES_URL!, // Vercel'in otomatik sağladığı ortam değişkeni
  },
});