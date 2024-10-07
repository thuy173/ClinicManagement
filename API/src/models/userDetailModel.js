import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { GENDER, STATUS } from "~/utils/constants";

// Define the collection name
const USER_DETAIL_COLLECTION_NAME = "user_details";

// Define the schema for user details
const USER_DETAIL_COLLECTION_SCHEMA = Joi.object({
  user_id: Joi.any().required(),
  name: Joi.string().required().min(3).max(100).trim().strict(),
  phone: Joi.string().required().min(10).max(20).trim().strict(),
  email: Joi.string().email().max(100).trim().strict(),
  dob: Joi.date(),
  gender: Joi.string().valid(...Object.values(GENDER)),
  address: Joi.string().max(255),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
});

const validateBeforeCreate = async (data) => {
  return await USER_DETAIL_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to create user details
const createUserDetails = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const existingUserDetail = await GET_DB()
      .collection(USER_DETAIL_COLLECTION_NAME)
      .findOne({
        $or: [{ phone: validData.phone }],
      });

    if (existingUserDetail) {
      throw new Error("Phone already exists");
    }
    // Insert into the user_details collection
    const result = await GET_DB()
      .collection(USER_DETAIL_COLLECTION_NAME)
      .insertOne(validData);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOneByUserId = async (userId) => {
  try {
    const result = await GET_DB()
      .collection(USER_DETAIL_COLLECTION_NAME)
      .findOne({ user_id: new ObjectId(userId) });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userDetailModel = {
  createUserDetails,
  findOneByUserId,
};
