import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

// Define the collection name
const SCHEDULE_COLLECTION_NAME = "schedules";

const SCHEDULE_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(20).trim().strict(),
  create_at: Joi.date().default(Date.now),
  update_at: Joi.date().default(Date.now),
});

const validateBeforeCreate = async (data) => {
  return await SCHEDULE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to get a role by name
const getAllData = async () => {
  try {
    const results = await GET_DB()
      .collection(SCHEDULE_COLLECTION_NAME)
      .find({})
      .toArray();

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    const existingSchedule = await GET_DB()
      .collection(SCHEDULE_COLLECTION_NAME)
      .findOne({ name: validData.name });

    if (existingSchedule) {
      throw new Error(`Schedule '${data}' already exists`);
    }

    const result = await GET_DB()
      .collection(SCHEDULE_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(SCHEDULE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const roleModel = {
  getAllData,
  create,
  findOneById,
};
