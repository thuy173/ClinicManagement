import express from "express";
import { serviceController } from "~/controllers/serviceController";

const Router = express.Router();

Router.route("/").get(serviceController.getAllServices);
Router.route("/:id").get(serviceController.getServiceById);

export const serviceRoute = Router;
