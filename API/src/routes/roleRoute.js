import express from "express";
import { roleController } from "~/controllers/roleController";

const Router = express.Router();

Router.route("/").post(roleController.createRole);

export const roleRoute = Router;
