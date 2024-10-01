import express from "express";
// import { auth } from "~/middlewares/auth";
import { authRoute } from "./authRoute";
import { patientRoute } from "./patientRoute";
import { roleRoute } from "./roleRoute";

const Router = express.Router();

// Router.use("/patient", auth.verifyToken);

/** User APIs */
Router.use("/auth", authRoute);

/** Patient APIs */
Router.use("/patient", patientRoute);

/** Role APIs */
Router.use("/role", roleRoute);

export const APIs = Router;
