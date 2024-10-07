import { StatusCodes } from "http-status-codes";
import { bookingModel } from "~/models/bookingModel";
import { roleModel } from "~/models/rolesModel";
import { userModel } from "~/models/userModel";
import { STATUS } from "~/utils/constants";
import ApiError from "~/utils/error";

const create = async (reqBody) => {
  const userId = reqBody.user_id;
  
  const bookingData = {
    name: reqBody.name,
    phone: reqBody.phone,
    email: reqBody.email,
    service_id: reqBody.service_id,
    schedule_id: reqBody.schedule_id,
    booking_time: reqBody.booking_time,
    status: STATUS.ACTIVE,
  };

  const user = await userModel.findOneById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const role = await roleModel.findOneById(user.role_id);
  if (!role) {
    throw new Error("Role user not found.");
  }

  if (role.name !== "Doctor") {
    throw new Error("Doctors have this right.");
  }
  try {
    const createBooking = await bookingModel.create(bookingData);

    return createBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const bookings = await bookingModel.getAll();
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const booking = await bookingModel.findOneById(id);

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
  const booking = await bookingModel.updateById(id, updateBooking);

  return booking;
};

const deleteById = async (id) => {
  const booking = await bookingModel.findOneById(id);
  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Booking not found!");
  }
  await bookingModel.deleteById(id);

  return { message: "Delete booking successfully!" };
};

export const bookingService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
