import { StatusCodes } from "http-status-codes";
import { scheduleModel } from "~/models/scheduleModel";
import { STATUS } from "~/utils/constants";
import ApiError from "~/utils/error";

const create = async (reqBody) => {
  const scheduleData = {
    user_id: reqBody.user_id,
    work_date: reqBody.work_date,
    start_time: reqBody.start_time,
    end_time: reqBody.end_time,
    status: STATUS.ACTIVE,
  };
  try {
    const createService = await scheduleModel.create(scheduleData);

    return createService;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const schedule = await scheduleModel.getAll();
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
