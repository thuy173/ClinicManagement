import { StatusCodes } from "http-status-codes";
import { appointmentService } from "~/services/appointmentService";

const createAppointment = async (req, res) => {
  try {
    const reqData = req.body;

    const newData = await appointmentService.create(reqData);

    res.status(StatusCodes.CREATED).json(newData);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const checkDuplicatePhone = async (req, res) => {
  const { phone } = req.body;

  try {
    const { isDuplicate, message } = await appointmentService.checkDuplicate(
      phone
    );

    return res.status(200).json({
      success: true,
      isDuplicate,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while checking the phone number.",
    });
  }
};

const getAllAppointments = async (req, res, next) => {
  try {
    const results = await appointmentService.getAll();

    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    next(error);
  }
};

const getAppointmentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await appointmentService.getById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = await appointmentService.updateById(id, req.body);

    res.status(StatusCodes.OK).json(update);
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await appointmentService.deleteById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const appointmentController = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  checkDuplicatePhone,
};
