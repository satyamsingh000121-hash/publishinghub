import { prisma } from "./prisma";

export async function checkDbConnection(): Promise<{ isConnected: boolean; error?: string }> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { isConnected: true };
  } catch (error: any) {
    console.error("Database connection error:", error?.message || error);
    return { isConnected: false, error: error?.message || "Failed to connect to database" };
  }
}

export { prisma };
