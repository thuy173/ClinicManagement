import express from "express";
import { patientController } from "~/controllers/patientController";

const Router = express.Router();

Router.route("/").get(patientController.getAllPatients);
Router.route("/:id").get(patientController.getPatientById);
Router.route("/").post(patientController.createPatient);
Router.route("/:id").put(patientController.updatePatient);
Router.route("/:id").delete(patientController.deletePatient);

export const patientRoute = Router;
