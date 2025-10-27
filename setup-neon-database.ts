import { db } from "./server/db";
import { users } from "./shared/schema";
import bcrypt from "bcryptjs";

async function setupDatabase() {
  try {
    console.log("🚀 Setting up SFGM Boston database...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    
    const [adminUser] = await db.insert(users).values({
      id: "admin-pastor-rocky",
      email: "pastor_rocky@sfgmboston.com",
      username: "pastor.rocky",
      password: adminPassword,
      firstName: "Pastor",
      lastName: "Rocky",
      role: "admin",
      gender: "Male",
      profileCompleted: true,
      emailVerified: true,
      registrationMethod: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    console.log("✅ Admin user created:");
    console.log("   Username: pastor.rocky");
    console.log("   Password: admin123");
    console.log("   Email: pastor_rocky@sfgmboston.com");

    // Create test student
    const studentPassword = await bcrypt.hash("student123", 10);
    
    const [testStudent] = await db.insert(users).values({
      id: "student-test-001",
      email: "student@test.com",
      username: "test.student",
      password: studentPassword,
      firstName: "Test",
      lastName: "Student",
      role: "student",
      gender: "Male",
      profileCompleted: true,
      emailVerified: true,
      registrationMethod: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    console.log("\n✅ Test student created:");
    console.log("   Username: test.student");
    console.log("   Password: student123");
    console.log("   Email: student@test.com");

    console.log("\n🎉 Database setup complete!");
    console.log("\n⚠️  Important: Change these passwords after first login!");

  } catch (error: any) {
    if (error.code === "23505") {
      console.log("ℹ️  Users already exist. Skipping creation.");
    } else {
      console.error("❌ Error setting up database:", error.message);
      throw error;
    }
  }
}

setupDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
