import express from "express";
import { doctorController } from "~/controllers/doctorController";

const Router = express.Router();

Router.route("/").get(doctorController.getAllDoctors);
Router.route("/:id").get(doctorController.getDoctorById);

export const doctorRoute = Router;
