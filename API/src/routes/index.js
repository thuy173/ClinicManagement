import express from "express";
import { auth } from "~/middlewares/auth";
import { authRoute } from "./authRoute";
import { patientRoute } from "./patientRoute";

const Router = express.Router();

Router.use("/patient", auth.verifyToken);

/** User APIs */
Router.use("/auth", authRoute);

/** Patient APIs */
Router.use("/patient", patientRoute);

export const APIs = Router;
