import { StatusCodes } from "http-status-codes";
import { userModel } from "~/models/userModel";
import ApiError from "~/utils/error";
import { userDetailModel } from "~/models/userDetailModel";
import { userService } from "./userService";
import { DoctorDetailModel } from "~/models/doctorDetailModel";

const create = async (reqBody) => {
  try {
    const userId = await userService.createUserWithRole(reqBody, "Doctor");

    // Create details
    const doctorDetail = { user_id: userId };
    await DoctorDetailModel.createDetails(doctorDetail);

    return { userId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const doctors = await DoctorDetailModel.getAll();

    // Duyệt qua tất cả bệnh nhân và bổ sung thông tin từ user_details và user
    const doctorDetailsWithUser = await Promise.all(
      doctors.map(async (doctor) => {
        const userDetail = await userDetailModel.findOneByUserId(
          doctor.user_id
        );
        const user = await userModel.findOneById(doctor.user_id);

        return {
          name: userDetail.name,
          phone: userDetail.phone,
          email: userDetail.email,
          dob: userDetail.dob,
          gender: userDetail.gender,
          address: userDetail.address,
          status: userDetail.status,
          medical_history: doctor.medical_history,
          username: user.username,
        };
      })
    );

    return doctorDetailsWithUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const doctor = await DoctorDetailModel.findOneById(id);

    if (!doctor) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
    }

    const userDetail = await userDetailModel.findOneByUserId(doctor.user_id);
    const user = await userModel.findOneById(doctor.user_id);

    return {
      name: userDetail.name,
      phone: userDetail.phone,
      email: userDetail.email,
      dob: userDetail.dob,
      gender: userDetail.gender,
      address: userDetail.address,
      status: userDetail.status,
      medical_history: doctor.medical_history,
      username: user.username,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateById = async (id, data) => {
  const updateDoctor = {
    ...data,
    // updateAt: Date.now(),
  };
  const doctor = await DoctorDetailModel.updateById(id, updateDoctor);

  return doctor;
};

const deleteById = async (id) => {
  const doctor = await DoctorDetailModel.findOneById(id);
  if (!doctor) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Doctor not found!");
  }
  await DoctorDetailModel.deleteById(id);

  return { message: "Delete doctor successfully!" };
};

export const doctorService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
