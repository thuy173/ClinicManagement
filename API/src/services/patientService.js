import { StatusCodes } from "http-status-codes";
import { patientModel } from "~/models/patientModel";
import { userModel } from "~/models/userModel";
import { DEFAULT_PASSWORD, STATUS, USER_ROLE } from "~/utils/constants";
import ApiError from "~/utils/error";
import * as bcrypt from "bcrypt";

const create = async (reqBody) => {
  // Chuẩn bị dữ liệu bệnh nhân từ request body
  const patientData = {
    name: reqBody.name,
    phone: reqBody.phone,
    dob: reqBody.dob,
    gender: reqBody.gender,
    address: reqBody.address,
    status: STATUS.ACTIVE,
  };

  // Tạo bệnh nhân từ patientModel
  const createdPatient = await patientModel.create(patientData);

  const patientId = createdPatient.insertedId;

  // Chuẩn bị dữ liệu user (tài khoản) để tạo tài khoản với role PATIENT
  const userData = {
    username: reqBody.phone,
    password: DEFAULT_PASSWORD,
    role: USER_ROLE.PATIENT,
    patient_id: patientId,
  };

  const salt = bcrypt.genSaltSync(10);
  userData.password = bcrypt.hashSync(userData.password, salt);

  // Tạo tài khoản người dùng từ userModel
  const createdUser = await userModel.registerUser(userData);

  // Nếu không thể tạo tài khoản người dùng, rollback bệnh nhân
  if (!createdUser) {
    await patientModel.deleteById({ _id: patientId });
    throw new Error("Failed to create user. Patient creation rolled back.");
  }

  const getNewPatient = await patientModel.findOneById(patientId);

  return getNewPatient;
};

const getAll = async () => {
  const patients = await patientModel.getAll();
  return patients;
};

const getById = async (id) => {
  const patient = await patientModel.findOneById(id);
  if (!patient) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
  }
  return patient;
};

const updateById = async (id, data) => {
  const updatePatient = {
    ...data,
    updateAt: Date.now(),
  };
  const patient = await patientModel.updateById(id, updatePatient);

  return patient;
};

const deleteById = async (id) => {
  const patient = await patientModel.findOneById(id);
  if (!patient) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
  }
  await patientModel.deleteById(id);

  return { message: "Delete patient successfully!" };
};

export const patientService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
