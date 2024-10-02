import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { STATUS } from "~/utils/constants";

// Define the collection name
const BOOKING_COLLECTION_NAME = "bookings";

// Define the schema
const BOOKING_COLLECTION_SCHEMA = Joi.object({
  user_id: Joi.any().required(),
  service_id: Joi.any().required(),
  schedule_id: Joi.any().required(),
  booking_time: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
});

// Chỉ định ra những Fields mà không muốn cho phép cập nhật trong hàm update()
const INVALID_UPDATE_FIELDS = ["_id"];

const validateBeforeCreate = async (data) => {
  return await BOOKING_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to create
const create = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    // Insert into collection
    const result = await GET_DB()
      .collection(BOOKING_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const results = await GET_DB()
      .collection(BOOKING_COLLECTION_NAME)
      .find({})
      .toArray();

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOOKING_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateById = async (id, data) => {
  try {
    // Lọc những field mà không cho phép cập nhật
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete data[fieldName];
      }
    });

    // Đối với những dữ liệu liên quan ObjectId, biến đổi ở đây
    if (data.userId) {
      data.userId = data.userId.map((_id) => new ObjectId(_id));
    }

    const validData = await validateBeforeCreate(data);

    const result = await GET_DB()
      .collection(BOOKING_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: validData },
        { returnDocument: "after" }
      );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BOOKING_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const bookingModel = {
  create,
  getAll,
  findOneById,
  updateById,
  deleteById,
};
