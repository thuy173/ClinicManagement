import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcrypt";
import { userService } from "~/services/userService";
import { auth } from "~/middlewares/auth";
import { roleService } from "~/services/roleService";

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errMessage: "Please fill all required areas!" });
    }

    const result = await userService.login(username);

    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errMessage: "Your phone/password is wrong!" });
    }

    const hashedPassword = result.password;
    if (!bcrypt.compareSync(password, hashedPassword)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ errMessage: "Your phone/password is wrong!" });
    }

    const role = await roleService.getById(result.role_id);

    if (!role) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ errMessage: "User role not found!" });
    }

    const verifyToken = auth.generateToken(result._id.toString(), role.name);

    result.verifyToken = verifyToken;

    await userService.updateVerifyToken(result._id, verifyToken);

    delete result.password;

    return res
      .status(StatusCodes.OK)
      .send({ message: "User login successful!", user: result });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
};
