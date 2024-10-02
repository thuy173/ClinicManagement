import express from "express";
import { scheduleController } from "~/controllers/scheduleController";

const Router = express.Router();

Router.route("/").get(scheduleController.getAllSchedules);
Router.route("/:id").get(scheduleController.getScheduleById);
Router.route("/").post(scheduleController.createSchedule);
Router.route("/:id").put(scheduleController.updateSchedule);
Router.route("/:id").delete(scheduleController.deleteSchedule);

export const scheduleRoute = Router;
