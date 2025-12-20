import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrismaChat: PrismaClient;
}

/**
 * Separate Prisma client targeting the chat database via CHAT_DATABASE_URL.
 * Falls back to DATABASE_URL if CHAT_DATABASE_URL is not provided.
 * This keeps auth/users on the default DB while chat sessions/messages
 * are stored in the named DB.
 */
const chatUrl = process.env.CHAT_DATABASE_URL || process.env.CMS_DATABASE_URL;
if (!chatUrl) {
  throw new Error("Missing CHAT_DATABASE_URL or CMS_DATABASE_URL");
}

let prismaChat: PrismaClient;
if (process.env.NODE_ENV === "production") {
  // TODO: Prisma 7 removed datasources arg. Using default config.
  prismaChat = new PrismaClient();
} else {
  if (!global.cachedPrismaChat) {
    global.cachedPrismaChat = new PrismaClient();
  }
  prismaChat = global.cachedPrismaChat;
}

export const prismadbChat = prismaChat;
