import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
import { STATUS } from "~/utils/constants";
import { ObjectId } from "mongodb";

// Define the collection name
const USER_COLLECTION_NAME = "users";

// Define the schema for users
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(10).max(20).trim().strict(),
  password: Joi.string().required().min(6).max(255).trim().strict(),
  avatar: Joi.string().default(""),
  role_id: Joi.any(),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
  verifyToken: Joi.string().allow(null).default(null),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
});

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createUser = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    // Step 1: Check if username (phone) already exists
    const existingUser = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        $or: [{ username: validData.phone }],
      });

    if (existingUser) {
      throw new Error("Phone number already exists as a username");
    }

    // Step 2: Insert into the users collection
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateVerifyToken = async (userId, verifyToken) => {
  try {
    await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { verifyToken: verifyToken } }
      );
  } catch (error) {
    throw new Error(
      "Error updating verifyToken in userModel: " + error.message
    );
  }
};

const findOneById = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(userId) });
    delete result.password;
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByUserName = async (username) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ username: username });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  createUser,
  findOneById,
  findOneByUserName,
  updateVerifyToken,
};
