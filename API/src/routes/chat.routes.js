import express from "express";
import { ChatController } from "~/controllers/chat.controller";

const Router = express.Router();

Router.route("/messages/:room").get(ChatController.getMessages);
Router.route("/messages").post(ChatController.saveMessage);

export const chatRoute = Router;
