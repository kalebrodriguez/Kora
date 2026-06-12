import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

/**
 * Absolute file: URL for the SQLite db at packages/db/dev.db, so the client
 * works regardless of which app's cwd Prisma is loaded from.
 */
export function defaultSqliteUrl(): string {
  const here = path.dirname(fileURLToPath(import.meta.url)); // packages/db/src
  return `file:${path.resolve(here, "..", "dev.db")}`;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL ?? defaultSqliteUrl() } },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
