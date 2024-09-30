import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { GENDER, STATUS } from "~/utils/constants";

// Define the collection name
const PATIENT_COLLECTION_NAME = "patients";

// Define the schema using Joi
const PATIENT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  phone: Joi.string().required().min(10).max(20).trim().strict(),
  dob: Joi.date().required(),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required(),
  address: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(STATUS))
    .required(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
});

// Chỉ định ra những Fields mà chúng ta không muốn cho phép cập nhật trong hàm update()
const INVALID_UPDATE_FIELDS = ["_id", "createdAt"];

// Function to validate data before creating a new patient
const validateBeforeCreate = async (data) => {
  return await PATIENT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

// Function to register a new patient
const create = async (data) => {
  try {
    // Validate the patient data
    const validPatientData = await validateBeforeCreate(data);

    const existingPatient = await GET_DB()
      .collection(PATIENT_COLLECTION_NAME)
      .findOne({
        $or: [{ phone: validPatientData.phone }],
      });

    if (existingPatient) {
      throw new Error("Phone already exists");
    }
    // Insert the patient data into the database
    const createdPatient = await GET_DB()
      .collection(PATIENT_COLLECTION_NAME)
      .insertOne(validPatientData);

    return createdPatient;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const patients = await GET_DB()
      .collection(PATIENT_COLLECTION_NAME)
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
      .collection(PATIENT_COLLECTION_NAME)
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

    const validPatientData = await PATIENT_COLLECTION_SCHEMA.validateAsync(
      data,
      {
        abortEarly: false,
      }
    );

    const result = await GET_DB()
      .collection(PATIENT_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: validPatientData },
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
      .collection(PATIENT_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const patientModel = {
  create,
  getAll,
  findOneById,
  updateById,
  deleteById,
};
