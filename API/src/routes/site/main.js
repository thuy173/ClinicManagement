import express from "express";
import { doctorRoute } from "./doctorRoute";
import { serviceRoute } from "./serviceRoute";
import { scheduleRoute } from "./scheduleRoute";

const siteRouter = express.Router();

/** Doctor APIs */
siteRouter.use("/doctor", doctorRoute);

/** Service APIs */
siteRouter.use("/service", serviceRoute);

/** Schedule APIs */
siteRouter.use("/schedule", scheduleRoute);

export const siteRoute = siteRouter;
