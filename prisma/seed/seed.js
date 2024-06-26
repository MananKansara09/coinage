import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "securepassword"; // In practice, use a hashed password
  const adminFirstName = "Admin";
  const adminLastName = "User";

  // Check if the admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Hash the password before storing it
    const salt = bcrypt.genSaltSync(Number(process.env.SALTROUND) || 10);
    const hash = bcrypt.hashSync(adminPassword, salt);

    // Create the admin user
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hash,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: "ADMIN",
      },
    });
    console.log("Admin user created successfully.");
  } else {
    console.log("Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
