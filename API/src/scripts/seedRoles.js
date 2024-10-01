import { GET_DB } from "~/config/mongodb";

// Hàm để kiểm tra và tạo các role mặc định
export const seedRoles = async () => {
  try {
    const db = GET_DB();

    const roles = [
      { name: "Admin" },
      { name: "Patient" },
      { name: "Doctor" },
    ];

    for (const role of roles) {
      // Kiểm tra xem role đã tồn tại chưa
      const existingRole = await db.collection("roles").findOne({ name: role.name });
      
      if (!existingRole) {
        // Thêm role vào collection roles nếu chưa tồn tại
        await db.collection("roles").insertOne({ ...role, createdAt: new Date(), updatedAt: new Date() });
        console.log(`Role "${role.name}" created successfully`);
      } else {
        console.log(`Role "${role.name}" already exists`);
      }
    }
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};
