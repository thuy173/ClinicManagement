import { StatusCodes } from "http-status-codes";
import { serviceService } from "~/services/serviceService";

const createService = async (req, res) => {
  try {
    const serviceData = req.body;

    const newService = await serviceService.create(serviceData);

    res.status(StatusCodes.CREATED).json(newService);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllServices = async (req, res, next) => {
  try {
    const services = await serviceService.getAll();

    res.status(StatusCodes.OK).json(services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const service = await serviceService.getById(id);

    res.status(StatusCodes.OK).json(service);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateService = await serviceService.updateById(id, req.body);

    res.status(StatusCodes.OK).json(updateService);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await serviceService.deleteById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const serviceController = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
