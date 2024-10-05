import express from "express";
import { bookingController } from "~/controllers/bookingController";
import { auth } from "~/middlewares/auth";

const Router = express.Router();

Router.route("/").get(bookingController.getAllBookings);
Router.route("/:id").get(bookingController.getBookingById);
Router.route("/").post(bookingController.createBooking);
Router.route("/:id").put(bookingController.updateBooking);

Router.route("/:id").delete(auth.checkRole(["Admin", "Doctor"]), bookingController.deleteBooking);

export const bookingRoute = Router;
