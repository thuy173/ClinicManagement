import { StatusCodes } from "http-status-codes";
import { roleService } from "~/services/roleService";

const createRole = async (req, res) => {
  try {
    const roleData = req.body;

    const newRole = await roleService.create(roleData);

    res.status(StatusCodes.CREATED).json(newRole);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const roleController = {
  createRole,
};
