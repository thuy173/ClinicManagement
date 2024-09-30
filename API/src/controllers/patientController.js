import { StatusCodes } from "http-status-codes";
import { patientService } from "~/services/patientService";

const createPatient = async (req, res) => {
  try {
    const patientData = req.body;

    const newPatient = await patientService.create(patientData);

    res.status(StatusCodes.CREATED).json(newPatient);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await patientService.getAll();

    res.status(StatusCodes.OK).json(patients);
  } catch (error) {
    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const patient = await patientService.getById(id);

    res.status(StatusCodes.OK).json(patient);
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatePatient = await patientService.updateById(id, req.body);

    res.status(StatusCodes.OK).json(updatePatient);
  } catch (error) {
    next(error);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await patientService.deleteById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const patientController = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
