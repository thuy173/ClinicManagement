import express from "express";
import { auth } from "~/middlewares/auth";
import { adminRoute } from "./admin/main";
import { siteRoute } from "./site/main";
import { authRoute } from "./authRoute";
import { bookingRoute } from "./bookingRoute";
import { chatRoute } from "./chat.routes";

const Router = express.Router();

Router.use("/admin", auth.verifyToken, auth.checkRole(["Admin", "Doctor", "Patient"]), adminRoute);

Router.use("/site", auth.verifyToken, auth.checkRole(["Patient", "Doctor", "Admin"]), siteRoute);

Router.use("/chat", chatRoute);

Router.use("/auth", authRoute);

Router.use("/booking", bookingRoute);



export const APIs = Router;
