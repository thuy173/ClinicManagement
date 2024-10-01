import express from "express";
import { doctorRoute } from "./doctorRoute";
import { serviceRoute } from "./serviceRoute";

const siteRouter = express.Router();

/** Doctor APIs */
siteRouter.use("/doctor", doctorRoute);

/** Service APIs */
siteRouter.use("/service", serviceRoute);

export const siteRoute = siteRouter;
