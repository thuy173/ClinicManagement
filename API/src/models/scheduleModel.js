import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { STATUS } from "~/utils/constants";

// Define the collection name
const SCHEDULE_COLLECTION_NAME = "schedules";

const SCHEDULE_COLLECTION_SCHEMA = Joi.object({
  user_ids: Joi.array().items(Joi.any()).required(),
  work_date: Joi.date().required(),
  start_time: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  end_time: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
});

const validateBeforeCreate = async (data) => {
  return await SCHEDULE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to get
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

    // const existingSchedule = await GET_DB()
    //   .collection(SCHEDULE_COLLECTION_NAME)
    //   .findOne({ user_id: validData.user_id });

    // if (existingSchedule) {
    //   throw new Error(`Schedule '${data}' already exists`);
    // }

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

const deleteById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(SCHEDULE_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const scheduleModel = {
  getAllData,
  create,
  findOneById,
  deleteById,
};
