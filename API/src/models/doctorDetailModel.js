import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

// Define the collection name
const DOCTOR_DETAIL_COLLECTION_NAME = "doctor_details";

// Define the schema for doctor details
const DOCTOR_DETAIL_COLLECTION_SCHEMA = Joi.object({
  user_id: Joi.any(),
  specialization: Joi.string(),
  experience_year: Joi.string(),
});

// Chỉ định ra những Fields mà chúng ta không muốn cho phép cập nhật trong hàm update()
const INVALID_UPDATE_FIELDS = ["_id", "user_id"];

const validateBeforeCreate = async (data) => {
  return await DOCTOR_DETAIL_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to create details
const createDetails = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    // Insert into the details collection
    const result = await GET_DB()
      .collection(DOCTOR_DETAIL_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const results = await GET_DB()
      .collection(DOCTOR_DETAIL_COLLECTION_NAME)
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
      .collection(DOCTOR_DETAIL_COLLECTION_NAME)
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
      .collection(DOCTOR_DETAIL_COLLECTION_NAME)
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
      .collection(DOCTOR_DETAIL_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const DoctorDetailModel = {
  createDetails,
  getAll,
  findOneById,
  updateById,
  deleteById,
};
