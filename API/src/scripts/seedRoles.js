import { GET_DB } from "../config/mongodb";
import { roleModel } from "../models/rolesModel";

const seedRoles = async () => {
  try {
    // Kết nối tới DB
    await GET_DB();

    const roles = [
      { name: "Admin" },
      { name: "patient" },
      { name: "Doctor" },
    ];

    for (let role of roles) {
      try {
        const insertedId = await roleModel.createRole(role.name);
        console.log(`Role '${role.name}' created with ID: ${insertedId}`);
      } catch (error) {
        console.error(`Error creating role '${role.name}':`, error.message);
      }
    }
  } catch (error) {
    console.error("Error seeding roles:", error.message);
  }
};

seedRoles();
