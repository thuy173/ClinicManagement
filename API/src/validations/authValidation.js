import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/error";

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(10).max(20).trim().strict(),
    password: Joi.string().required().min(6).strict(),
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().trim().strict(),
    password: Joi.string().required().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const authValidation = {
  register,
  login,
};
