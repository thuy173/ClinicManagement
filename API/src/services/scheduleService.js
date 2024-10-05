import { StatusCodes } from "http-status-codes";
import { roleModel } from "~/models/rolesModel";
import { scheduleModel } from "~/models/scheduleModel";
import { userModel } from "~/models/userModel";
import { STATUS } from "~/utils/constants";
import ApiError from "~/utils/error";

const create = async (reqBody, req) => {
  if (!req.user || !req.user._id) {
    throw new Error("User is not authenticated.");
  }

  const userId = req.user._id;

  if (!reqBody || typeof reqBody !== "object") {
    throw new Error("Invalid request body.");
  }

  const scheduleData = {
    user_id: userId,
    work_date: reqBody.work_date,
    start_time: reqBody.start_time,
    end_time: reqBody.end_time,
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

  if (role.name !== "Admin") {
    throw new Error("Doctors have this right.");
  }

  try {
    const createService = await scheduleModel.create(scheduleData);

    return createService;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const schedule = await scheduleModel.getAllData();
    return schedule;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const schedule = await scheduleModel.findOneById(id);

    if (!schedule) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Schedule not found!");
    }

    return schedule;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateById = async (id, data) => {
  const updateSchedule = {
    ...data,
    updateAt: Date.now(),
  };
  const schedule = await scheduleModel.updateById(id, updateSchedule);

  return schedule;
};

const deleteById = async (id) => {
  const schedule = await scheduleModel.findOneById(id);
  if (!schedule) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Service not found!");
  }
  await scheduleModel.deleteById(id);

  return { message: "Delete schedule successfully!" };
};

export const scheduleService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
