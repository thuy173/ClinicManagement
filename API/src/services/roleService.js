import { roleModel } from "~/models/rolesModel";

const create = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const createdRole = await roleModel.createRole(reqBody);

    return createdRole;
  } catch (error) {
    throw error;
  }
};

export const roleService = {
  create,
};
