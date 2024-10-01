import express from "express";
import { patientRoute } from "../admin/patientRoute";

const siteRouter = express.Router();

/** Patient APIs */
siteRouter.use("/patient", patientRoute);

export const siteRoute = siteRouter;
