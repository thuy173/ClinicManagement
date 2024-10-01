import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { GET_DB } from "~/config/mongodb";

dotenv.config();

const getAdminRoleId = async (db) => {
  const adminRole = await db.collection("roles").findOne({ name: "Admin" });
  if (!adminRole) {
    throw new Error("Admin role not found");
  }
  return adminRole._id;
};

export const seedAdminUser = async () => {
  try {
    const db = GET_DB();

    const adminRoleId = await getAdminRoleId(db);

    // Kiểm tra xem tài khoản admin đã tồn tại chưa
    const existingAdmin = await db
      .collection("users")
      .findOne({ role: "Admin" });

    if (!existingAdmin) {
      // Tạo tài khoản admin mặc định
      const adminData = {
        username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
        password: bcrypt.hashSync(
          process.env.DEFAULT_ADMIN_PASSWORD || "Admin@123",
          10
        ),
        role_id: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Thêm admin vào collection users
      await db.collection("users").insertOne(adminData);
      console.log("Admin account created successfully");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
