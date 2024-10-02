import express from "express";
import { doctorRoute } from "./doctorRoute";
import { serviceRoute } from "./serviceRoute";
import { scheduleRoute } from "./scheduleRoute";
import { bookingRoute } from "./bookingRoute";

const siteRouter = express.Router();

/** Doctor APIs */
siteRouter.use("/doctor", doctorRoute);

/** Service APIs */
siteRouter.use("/service", serviceRoute);

/** Schedule APIs */
siteRouter.use("/schedule", scheduleRoute);

/** Schedule APIs */
siteRouter.use("/booking", bookingRoute);

export const siteRoute = siteRouter;
