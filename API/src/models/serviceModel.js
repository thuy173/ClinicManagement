import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { STATUS } from "~/utils/constants";

// Define the collection name
const SERVICE_COLLECTION_NAME = "services";

// Define the schema for doctor details
const SERVICE_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  description: Joi.string().allow("").optional().max(500),
  price: Joi.number().min(0).precision(2).optional(),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null).allow(null),
});

// Chỉ định ra những Fields mà không muốn cho phép cập nhật trong hàm update()
const INVALID_UPDATE_FIELDS = ["_id"];

const validateBeforeCreate = async (data) => {
  return await SERVICE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to create patient details
const createDetails = async (data) => {
  try {
    const validServiceData = await validateBeforeCreate(data);

    // Insert into the patient_details collection
    const result = await GET_DB()
      .collection(SERVICE_COLLECTION_NAME)
      .insertOne(validServiceData);

    return result.insertedId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const patients = await GET_DB()
      .collection(SERVICE_COLLECTION_NAME)
      .find({})
      .toArray();
    patients.forEach((patients) => delete patients.password);

    return patients;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(SERVICE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    delete result.password;
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

    const validServiceData = await validateBeforeCreate(data);

    const result = await GET_DB()
      .collection(SERVICE_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: validServiceData },
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
      .collection(SERVICE_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const serviceModel = {
  createDetails,
  getAll,
  findOneById,
  updateById,
  deleteById,
};
