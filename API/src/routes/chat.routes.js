import express from "express";
import { ChatController } from "~/controllers/chat.controller";

const Router = express.Router();

Router.route("/messages/:room").get(ChatController.getMessages);

export const chatRoute = Router;
