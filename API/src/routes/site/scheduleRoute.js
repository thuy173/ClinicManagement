import express from "express";
import { scheduleController } from "~/controllers/scheduleController";

const Router = express.Router();

Router.route("/").get(scheduleController.getAllSchedules);
Router.route("/:id").get(scheduleController.getScheduleById);

export const scheduleRoute = Router;
