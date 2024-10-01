import express from "express";
import { serviceController } from "~/controllers/serviceController";

const Router = express.Router();

Router.route("/").get(serviceController.getAllServices);
Router.route("/:id").get(serviceController.getServiceById);
Router.route("/").post(serviceController.createService);
Router.route("/:id").put(serviceController.updateService);
Router.route("/:id").delete(serviceController.deleteService);

export const serviceRoute = Router;
