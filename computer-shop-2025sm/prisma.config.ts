import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",   // seeding
  },
  datasource: {
    db: {
      provider: "postgresql",
      adapter: env("DATABASE_URL"),   // <- poprawnie w Prisma 7
    },
  },
});
