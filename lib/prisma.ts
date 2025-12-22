import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  // Prisma 7 requires connection configuration via prisma.config.ts or driver adapter
  // Ensure prisma.config.ts is present and valid for connection to work.
  prisma = new PrismaClient();
} else {
  if (!(globalThis as any).cachedPrisma) {
    (globalThis as any).cachedPrisma = new PrismaClient();
  }
  prisma = (globalThis as any).cachedPrisma;
}

export const prismadb = prisma;
