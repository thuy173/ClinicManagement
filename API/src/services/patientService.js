import { StatusCodes } from "http-status-codes";
import { userModel } from "~/models/userModel";
import ApiError from "~/utils/error";
import { userDetailModel } from "~/models/userDetailModel";
import { patientDetailModel } from "~/models/patientDetailModel";
import { userService } from "./userService";

const create = async (reqBody) => {
  try {
    const userId = await userService.createUserWithRole(reqBody, "Patient");

    // Create patient details
    const patientDetails = { user_id: userId };
    await patientDetailModel.createDetails(patientDetails);

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
          user_id: patient.user_id,
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
      user_id: patient.user_id,
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
