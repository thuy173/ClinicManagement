import { StatusCodes } from "http-status-codes";
import { bookingService } from "~/services/bookingService";

const createBooking = async (req, res) => {
  try {
    const reqData = req.body;

    const newData = await bookingService.create(reqData);

    res.status(StatusCodes.CREATED).json(newData);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const results = await bookingService.getAll();

    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.getById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = await bookingService.updateById(id, req.body);

    res.status(StatusCodes.OK).json(update);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.deleteById(id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
