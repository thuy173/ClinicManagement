import express from "express";
import { patientRoute } from "./patientRoute";
import { roleRoute } from "./roleRoute";
import { doctorRoute } from "./doctorRoute";
import { serviceRoute } from "./serviceRoute";
import { scheduleRoute } from "./scheduleRoute";
import { appointmentRoute } from "./appointRoute";

const adminRouter = express.Router();

/** Role APIs */
adminRouter.use("/role", roleRoute);

/** Patient APIs */
adminRouter.use("/patient", patientRoute);

/** Doctor APIs */
adminRouter.use("/doctor", doctorRoute);

/** Service APIs */
adminRouter.use("/service", serviceRoute);

/** Schedule APIs */
adminRouter.use("/schedule", scheduleRoute);

/** appointment APIs */
adminRouter.use("/appointment", appointmentRoute);

export const adminRoute = adminRouter;
