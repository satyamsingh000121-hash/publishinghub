import { prisma } from "../lib/prisma";

async function main() {
  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        passwordResetTokenHash: true,
        passwordResetExpires: true,
      },
    });
    console.log("Successfully selected user with reset token fields:", user);
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
