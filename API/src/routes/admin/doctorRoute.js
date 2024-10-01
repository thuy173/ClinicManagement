import express from "express";
import { doctorController } from "~/controllers/doctorController";

const Router = express.Router();

Router.route("/").get(doctorController.getAllDoctors);
Router.route("/:id").get(doctorController.getDoctorById);
Router.route("/").post(doctorController.createDoctor);
Router.route("/:id").put(doctorController.updateDoctor);
Router.route("/:id").delete(doctorController.deleteDoctor);

export const doctorRoute = Router;
