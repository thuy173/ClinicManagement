import { StatusCodes } from "http-status-codes";
import { userModel } from "~/models/userModel";
import ApiError from "~/utils/error";
import { userDetailModel } from "~/models/userDetailModel";
import { patientDetailModel } from "~/models/patientDetailModel";
import { DEFAULT_PASSWORD, STATUS } from "~/utils/constants";
import { roleModel } from "~/models/rolesModel";
import * as bcrypt from "bcrypt";

const create = async (reqBody) => {
  // Data for patient details
  const patientData = {
    name: reqBody.name,
    phone: reqBody.phone,
    email: reqBody.email,
    dob: reqBody.dob,
    gender: reqBody.gender,
    address: reqBody.address,
    status: STATUS.ACTIVE,
  };

  try {
    // Step 1: Fetch the "patient" role
    const role = await roleModel.getRole("Patient");

    if (!role) {
      throw new Error("Role 'patient' not found");
    }

    // Step 2: Create a user with phone as the username
    const userData = {
      username: reqBody.phone,
      password: DEFAULT_PASSWORD,
      role_id: role._id,
      status: STATUS.ACTIVE,
    };

    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);

    const userId = await userModel.createUser(userData);

    // Step 3: Create user details
    const userDetails = { ...patientData, user_id: userId };
    await userDetailModel.createUserDetails(userDetails);

    // Step 4: Create patient details
    const patientDetails = { user_id: userId };
    await patientDetailModel.createPatientDetails(patientDetails);

    return { userId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const patients = await patientDetailModel.getAll();

    // Duyệt qua tất cả bệnh nhân và bổ sung thông tin từ user_details và user
    const patientDetailsWithUser = await Promise.all(
      patients.map(async (patient) => {
        const userDetail = await userDetailModel.findOneByUserId(
          patient.user_id
        );
        const user = await userModel.findOneById(patient.user_id);

        return {
          name: userDetail.name,
          phone: userDetail.phone,
          email: userDetail.email,
          dob: userDetail.dob,
          gender: userDetail.gender,
          address: userDetail.address,
          status: userDetail.status,
          medical_history: patient.medical_history,
          username: user.username,
        };
      })
    );

    return patientDetailsWithUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const patient = await patientDetailModel.findOneById(id);

    if (!patient) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
    }

    const userDetail = await userDetailModel.findOneByUserId(patient.user_id);
    const user = await userModel.findOneById(patient.user_id);

    return {
      name: userDetail.name,
      phone: userDetail.phone,
      email: userDetail.email,
      dob: userDetail.dob,
      gender: userDetail.gender,
      address: userDetail.address,
      status: userDetail.status,
      medical_history: patient.medical_history,
      username: user.username,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateById = async (id, data) => {
  const updatePatient = {
    ...data,
    // updateAt: Date.now(),
  };
  const patient = await patientDetailModel.updateById(id, updatePatient);

  return patient;
};

const deleteById = async (id) => {
  const patient = await patientDetailModel.findOneById(id);
  if (!patient) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
  }
  await patientDetailModel.deleteById(id);

  return { message: "Delete patient successfully!" };
};

export const patientService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
