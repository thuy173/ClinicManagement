import { StatusCodes } from "http-status-codes";
import { doctorService } from "~/services/doctorService";

const createDoctor = async (req, res) => {
  try {
    const doctorData = req.body;

    const newDoctor = await doctorService.create(doctorData);

    res.status(StatusCodes.CREATED).json(newDoctor);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorService.getAll();

    res.status(StatusCodes.OK).json(doctors);
  } catch (error) {
    next(error);
  }
};

const getDoctorById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doctor = await doctorService.getById(id);

    res.status(StatusCodes.OK).json(doctor);
  } catch (error) {
    next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateDoctor = await doctorService.updateById(id, req.body);

    res.status(StatusCodes.OK).json(updateDoctor);
  } catch (error) {
    next(error);
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await doctorService.deleteById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const doctorController = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
