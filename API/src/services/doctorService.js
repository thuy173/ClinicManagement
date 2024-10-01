import { StatusCodes } from "http-status-codes";
import { userModel } from "~/models/userModel";
import ApiError from "~/utils/error";
import { userDetailModel } from "~/models/userDetailModel";
import { userService } from "./userService";
import { DoctorDetailModel } from "~/models/doctorDetailModel";

const create = async (reqBody) => {
  try {
    const userId = await userService.createUserWithRole(reqBody, "Doctor");

    // Create patient details
    const patientDetails = { user_id: userId };
    await DoctorDetailModel.createDetails(patientDetails);

    return { userId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const patients = await DoctorDetailModel.getAll();

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
    const patient = await DoctorDetailModel.findOneById(id);

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
  const patient = await DoctorDetailModel.updateById(id, updatePatient);

  return patient;
};

const deleteById = async (id) => {
  const patient = await DoctorDetailModel.findOneById(id);
  if (!patient) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
  }
  await DoctorDetailModel.deleteById(id);

  return { message: "Delete patient successfully!" };
};

export const doctorService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};