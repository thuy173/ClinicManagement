import express from "express";
import { patientRoute } from "./patientRoute";
import { roleRoute } from "./roleRoute";
import { doctorRoute } from "./doctorRoute";

const adminRouter = express.Router();

/** Patient APIs */
adminRouter.use("/patient", patientRoute);

/** Doctor APIs */
adminRouter.use("/doctor", doctorRoute);

/** Role APIs */
adminRouter.use("/role", roleRoute);

export const adminRoute = adminRouter;
