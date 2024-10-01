import express from "express";
import { doctorController } from "~/controllers/doctorController";
import { auth } from "~/middlewares/auth";

const Router = express.Router();

Router.route("/").get(auth.checkRole(["Admin", "Doctor"]),doctorController.getAllDoctors);
Router.route("/:id").get(auth.checkRole(["Admin", "Doctor"]),doctorController.getDoctorById);

Router.route("/").post(auth.checkRole(["Admin"]),doctorController.createDoctor);
Router.route("/:id").put(auth.checkRole(["Admin"]),doctorController.updateDoctor);
Router.route("/:id").delete(auth.checkRole(["Admin"]),doctorController.deleteDoctor);

export const doctorRoute = Router;
