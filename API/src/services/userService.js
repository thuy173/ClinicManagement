import { roleModel } from "~/models/rolesModel";
import { userDetailModel } from "~/models/userDetailModel";
import { userModel } from "~/models/userModel";
import { DEFAULT_PASSWORD, STATUS } from "~/utils/constants";
import * as bcrypt from "bcrypt";

const createUserWithRole = async (reqBody, roleName) => {
  const userDetailData = {
    name: reqBody.name,
    phone: reqBody.phone,
    email: reqBody.email,
    dob: reqBody.dob,
    gender: reqBody.gender,
    address: reqBody.address,
    status: STATUS.ACTIVE,
  };

  try {
    const role = await roleModel.getRole(roleName);

    if (!role) {
      throw new Error(`Role '${roleName}' not found`);
    }

    const userData = {
      username: reqBody.phone,
      password: DEFAULT_PASSWORD,
      role_id: role._id,
      status: STATUS.ACTIVE,
    };

    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);

    const userId = await userModel.createUser(userData);

    const userDetails = {
      ...userDetailData,
      user_id: userId,
      status: STATUS.ACTIVE,
    };

    await userDetailModel.createUserDetails(userDetails);

    return userId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (username) => {
  try {
    const user = await userModel.findOneByUserName(username);
    if (!user) throw new Error("Your username/password is wrong!");
    return user;
  } catch (err) {
    throw new Error("Login wrong: " + err.message);
  }
};

const updateVerifyToken = async (userId, verifyToken) => {
  try {
    // Gọi hàm từ model để cập nhật verifyToken
    await userModel.updateVerifyToken(userId, verifyToken);
  } catch (error) {
    throw new Error("Error updating verifyToken: " + error.message);
  }
};

const getUser = async (id) => {
  try {
    const user = await userModel.findOneById(id);
    if (!user) throw new Error("User not found!");
    return user;
  } catch (err) {
    throw new Error("Something went wrong: " + err.message);
  }
};

export const userService = {
  login,
  getUser,
  updateVerifyToken,
  createUserWithRole,
};
