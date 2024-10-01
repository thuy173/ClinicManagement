import express from "express";
import { patientRoute } from "./patientRoute";
import { roleRoute } from "./roleRoute";

const adminRouter = express.Router();

/** Patient APIs */
adminRouter.use("/patient", patientRoute);

/** Role APIs */
adminRouter.use("/role", roleRoute);

export const adminRoute = adminRouter;
