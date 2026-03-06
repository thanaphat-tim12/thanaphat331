import { prisma } from '../src/prisma';

async function main() {
  try {
    console.log("Connecting to database...");
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("Database connection successful:", result);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
