import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { USER_ROLE } from "~/utils/constants";

// Define Collection (Name & Schema)
const USER_COLLECTION_NAME = "users";
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(10).max(20).trim().strict(),
  password: Joi.string().required().min(6).strict(),
  avatar: Joi.string().default(""),
  role: Joi.string().valid(...Object.values(USER_ROLE)),
  status: Joi.boolean().default(true),
  verifyToken: Joi.string().allow(null, ""),
  patient_id: Joi.any(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
});

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const registerUser = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    const existingUser = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        $or: [{ username: validData.username }],
      });

    if (existingUser) {
      throw new Error("Phone already exists");
    }

    const createdUser = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validData);

    return createdUser;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
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

const updateAvatar = async (userId, userData) => {
  try {
    const updateFields = {
      username: userData.username,
      displayName: userData.username,
      updatedAt: new Date(),
    };

    if (userData.avatarUrl) {
      updateFields.avatar = userData.avatarUrl;
    }
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateFields },
        { returnDocument: "after" }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const isActive = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(userId) }, { $set: { status: true } });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const unIsActive = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(userId) }, { $set: { status: false } });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  registerUser,
  deleteById,
  findOneById,
  findOneByUserName,
  updateVerifyToken,
  updateAvatar,
  isActive,
  unIsActive,
};
