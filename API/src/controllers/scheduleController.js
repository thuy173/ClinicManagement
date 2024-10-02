import { StatusCodes } from "http-status-codes";
import { scheduleService } from "~/services/scheduleService";

const createSchedule = async (req, res) => {
  try {
    const scheduleData = req.body;

    const newSchedule = await scheduleService.create(scheduleData);

    res.status(StatusCodes.CREATED).json(newSchedule);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllSchedules = async (req, res, next) => {
  try {
    const schedule = await scheduleService.getAll();

    res.status(StatusCodes.OK).json(schedule);
  } catch (error) {
    next(error);
  }
};

const getScheduleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const service = await scheduleService.getById(id);

    res.status(StatusCodes.OK).json(service);
  } catch (error) {
    next(error);
  }
};

const updateSchedule = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateSchedule = await scheduleService.updateById(id, req.body);

    res.status(StatusCodes.OK).json(updateSchedule);
  } catch (error) {
    next(error);
  }
};

const deleteSchedule = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await scheduleService.deleteById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const scheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
