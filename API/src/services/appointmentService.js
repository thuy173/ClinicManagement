import { StatusCodes } from "http-status-codes";
import { appointmentModel } from "~/models/appointmentModel";
import { userModel } from "~/models/userModel";
import { STATUS } from "~/utils/constants";
import ApiError from "~/utils/error";
import { userService } from "./userService";
import { roleModel } from "~/models/rolesModel";

const checkDuplicate = async (phone) => {
  try {
    const isDuplicate = await userService.checkDuplicatePhone(phone);
    if (isDuplicate) {
      return { isDuplicate, message: "Phone number is already in use." };
    }

    return { isDuplicate, message: "Phone number is available." };
  } catch (error) {
    throw new Error("Error checking duplicate phone.", error.message);
  }
};

const create = async (reqBody, req) => {
  try {
    const isDuplicate = await userService.checkDuplicatePhone(reqBody.phone);

    let userId;
    if (!isDuplicate) {
      userId = await userService.createUserWithRole(reqBody, "Patient");
    } else {
      const user = await userModel.findOneByUserName(reqBody.phone);
      userId = user._id;
    }

    if (!req.user || !req.user._id) {
      throw new Error("User is not authenticated.");
    }

    const doctor_user_id = req.user._id;

    const doctor = await userModel.findOneById(doctor_user_id);

    if (!doctor) {
      throw new Error("User not found.");
    }

    const role = await roleModel.findOneById(doctor.role_id);
    if (!role) {
      throw new Error("Role user not found.");
    }

    if (role.name !== "Doctor") {
      throw new Error("Doctors have this right.");
    }

    const appointmentData = {
      user_id: userId,
      doctor_user_id: doctor_user_id,
      service_id: reqBody.service_id,
      booking_id: reqBody.booking_id,
      appointment_date: reqBody.appointment_date,
      notes: reqBody.notes,
      status: STATUS.ACTIVE,
    };

    const createBooking = await appointmentModel.create(appointmentData);

    return createBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const bookings = await appointmentModel.getAll();
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const booking = await appointmentModel.findOneById(id);

    if (!booking) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Booking not found!");
    }

    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateById = async (id, data) => {
  const updateBooking = {
    ...data,
    updateAt: Date.now(),
  };
  const booking = await appointmentModel.updateById(id, updateBooking);

  return booking;
};

const deleteById = async (id) => {
  const booking = await appointmentModel.findOneById(id);
  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Booking not found!");
  }
  await appointmentModel.deleteById(id);

  return { message: "Delete booking successfully!" };
};

export const appointmentService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  checkDuplicate,
};
