import { StatusCodes } from "http-status-codes";
import { roleModel } from "~/models/rolesModel";
import ApiError from "~/utils/error";

const create = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const createdRole = await roleModel.createRole(reqBody);

    return createdRole;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  const patient = await roleModel.findOneById(id);
  if (!patient) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Patient not found!");
  }
  return patient;
};

export const roleService = {
  create,
  getById,
};
