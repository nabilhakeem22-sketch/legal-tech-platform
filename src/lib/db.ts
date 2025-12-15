import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Explicitly configuring datasource checking environment first, falling back to local file
export const db = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || "file:./dev.db"
        }
    }
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
