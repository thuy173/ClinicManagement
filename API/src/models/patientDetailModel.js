import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

// Define the collection name
const PATIENT_DETAIL_COLLECTION_NAME = "patient_details";

// Define the schema for patient details
const PATIENT_DETAIL_COLLECTION_SCHEMA = Joi.object({
  user_id: Joi.any(),
  medical_history: Joi.string(),
});

// Chỉ định ra những Fields mà không muốn cho phép cập nhật trong hàm update()
const INVALID_UPDATE_FIELDS = ["_id", "user_id"];

const validateBeforeCreate = async (data) => {
  return await PATIENT_DETAIL_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to create patient details
const createDetails = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    // Insert into the patient_details collection
    const result = await GET_DB()
      .collection(PATIENT_DETAIL_COLLECTION_NAME)
      .insertOne(validData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const results = await GET_DB()
      .collection(PATIENT_DETAIL_COLLECTION_NAME)
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
      .collection(PATIENT_DETAIL_COLLECTION_NAME)
      .findOne({ user_id: new ObjectId(id) });
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
      .collection(PATIENT_DETAIL_COLLECTION_NAME)
      .findOneAndUpdate(
        { user_id: new ObjectId(id) },
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
      .collection(PATIENT_DETAIL_COLLECTION_NAME)
      .deleteOne({ user_id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const patientDetailModel = {
  createDetails,
  getAll,
  findOneById,
  updateById,
  deleteById,
};
