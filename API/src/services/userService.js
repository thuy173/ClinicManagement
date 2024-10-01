import { userModel } from "~/models/userModel";

const register = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newUser = {
      ...reqBody,
      status: true,
    };

    const createdUser = await userModel.registerUser(newUser);

    const getNewUser = await userModel.findOneById(createdUser.insertedId);

    return getNewUser;
  } catch (error) {
    throw error;
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
  register,
  login,
  getUser,
  updateVerifyToken,
};
