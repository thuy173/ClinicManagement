import express from "express";
import { appointmentController } from "~/controllers/appointmentController";
import { auth } from "~/middlewares/auth";

const Router = express.Router();

Router.route("/").get(auth.checkRole(["Admin", "Doctor"]),appointmentController.getAllAppointments);
Router.route("/:id").get(auth.checkRole(["Admin", "Doctor"]),appointmentController.getAppointmentById);

Router.route("/").post(auth.checkRole(["Admin"]),appointmentController.createAppointment);
Router.route("/:id").put(auth.checkRole(["Admin"]),appointmentController.updateAppointment);
Router.route("/:id").delete(auth.checkRole(["Admin"]),appointmentController.deleteAppointment);

Router.route("/check-duplicate-phone").post(auth.checkRole(["Admin"]),appointmentController.checkDuplicatePhone);

export const appointmentRoute = Router;
