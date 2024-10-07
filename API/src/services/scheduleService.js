import { StatusCodes } from "http-status-codes";
import { roleModel } from "~/models/rolesModel";
import { scheduleModel } from "~/models/scheduleModel";
import { userDetailModel } from "~/models/userDetailModel";
import { userModel } from "~/models/userModel";
import { STATUS } from "~/utils/constants";
import ApiError from "~/utils/error";

const create = async (reqBody) => {
  const userIds = reqBody.userIds;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error("User IDs are required.");
  }

  const scheduleData = {
    user_ids: userIds,
    work_date: reqBody.work_date,
    start_time: reqBody.start_time,
    end_time: reqBody.end_time,
    status: STATUS.ACTIVE,
  };

  const schedulePromises = userIds.map(async (userId) => {
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
  });

  try {
    await Promise.all(schedulePromises);

    const createService = await scheduleModel.create(scheduleData);

    return createService;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const schedules = await scheduleModel.getAllData();

    const schedulesWithUserDetails = await Promise.all(
      schedules.map(async (schedule) => {
        const users = await Promise.all(
          schedule.user_ids.map(async (userId) => {
            const userDetail = await userDetailModel.findOneByUserId(userId);
            return {
              user_id: userDetail.user_id,
              name: userDetail.name,
              phone: userDetail.phone,
              email: userDetail.email,
              gender: userDetail.gender,
            };
          })
        );

        return {
          ...schedule,
          users,
        };
      })
    );

    return schedulesWithUserDetails;
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
    throw new ApiError(StatusCodes.NOT_FOUND, "Schedule not found!");
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
