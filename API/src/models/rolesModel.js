import Joi from "joi";
import { GET_DB } from "~/config/mongodb";

// Define the collection name
const ROLE_COLLECTION_NAME = "roles";

const ROLE_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(20).trim().strict(),
  create_at: Joi.date().default(Date.now),
  update_at: Joi.date().default(Date.now),
});

const validateBeforeCreate = async (data) => {
  return await ROLE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to get a role by name
const getRole = async (roleName) => {
  try {
    const role = await GET_DB()
      .collection(ROLE_COLLECTION_NAME)
      .findOne({ name: roleName });

    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }

    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to create a role (can be used for initialization or dynamic role creation)
const createRole = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    const existingRole = await GET_DB()
      .collection(ROLE_COLLECTION_NAME)
      .findOne({ name: validData.name });

    if (existingRole) {
      throw new Error(`Role '${data}' already exists`);
    }

    const result = await GET_DB()
      .collection(ROLE_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const roleModel = {
  getRole,
  createRole,
};
