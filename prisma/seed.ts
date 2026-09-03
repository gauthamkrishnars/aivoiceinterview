import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@voiceprep.app" },
    update: {},
    create: {
      email: "demo@voiceprep.app",
      name: "Demo User",
      password: "$2a$12$LJ3m4ys3G.XyFQMBGqMuVeqNJGs0K5gqKJjQnMKJQRCpIwLKBHkX6", // "password123"
    },
  });

  console.log({ demoUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
