import { StatusCodes } from "http-status-codes";
import { serviceModel } from "~/models/serviceModel";
import { STATUS } from "~/utils/constants";
import ApiError from "~/utils/error";

const create = async (reqBody) => {
  const serviceData = {
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
    status: STATUS.ACTIVE,
  };
  try {
    const createService = await serviceModel.createDetails(serviceData);

    return createService;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const services = await serviceModel.getAll();
    return services;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  try {
    const service = await serviceModel.findOneById(id);

    if (!service) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Service not found!");
    }

    return service;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateById = async (id, data) => {
  const updateService = {
    ...data,
    updateAt: Date.now(),
  };
  const service = await serviceModel.updateById(id, updateService);

  return service;
};

const deleteById = async (id) => {
  const service = await serviceModel.findOneById(id);
  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Service not found!");
  }
  await serviceModel.deleteById(id);

  return { message: "Delete service successfully!" };
};

export const serviceService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
