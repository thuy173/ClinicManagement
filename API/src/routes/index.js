import express from "express";
import { auth } from "~/middlewares/auth";
import { adminRoute } from "./admin/main";
import { siteRoute } from "./site/main";
import { authRoute } from "./authRoute";

const Router = express.Router();

Router.use("/admin", auth.verifyToken, auth.checkRole(["Admin"]), adminRoute);

Router.use("/site", auth.verifyToken, auth.checkRole(["Patient", "Doctor"]), siteRoute);

Router.use("/auth", authRoute);



export const APIs = Router;
