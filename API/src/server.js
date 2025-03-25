/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { errorHandlingMiddleware } from "./middlewares/errorHandler";
import { env } from "./config/environment";
import { CLOSE_DB, CONNECT_DB } from "./config/mongodb";
import exitHook from "async-exit-hook";
import { APIs } from "./routes";
import dotenv from "dotenv";
import { seedAdminUser } from "./scripts/seedAccountAdmin";
import { seedRoles } from "./scripts/seedRoles";
import { createServer } from "http";
import SocketService from "./services/chat.service";

const { Server } = require("socket.io");

dotenv.config();

const START_SERVER = () => {
  const app = express();

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/socket.io/", // Explicit path
    transports: ["websocket", "polling"], // Allow both WebSocket and polling
  });

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/api", APIs);

  app.use(errorHandlingMiddleware);

  const socketService = new SocketService(io);
  console.log("Socket service initialized");
  socketService.initialize();

  io.on("connection", (socket) => {
    console.log("Socket server listening for connections");
    const interval = setInterval(() => {
      socket.emit("ping");
    }, 25000);
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("User disconnected:", socket.id);
    });
  });

  if (env.BUILD_MODE === "production") {
    httpServer.listen(process.env.PORT, () => {
      console.log(
        `3. Production: Server is running successfully at Port: ${process.env.PORT}`
      );
    });
  } else {
    httpServer.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `3. Local Dev: Server is running successfully at host: ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`
      );
    });
  }
  exitHook(() => {
    console.log("4. Server is shutting down...");
    CLOSE_DB();
    console.log("5. Disconnect from MongoDb Cloud Atlas");
  });
};

console.log("1. Connecting to MongoDb Cloud Atlas...");
CONNECT_DB()
  .then(() => {
    console.log("2. Connected to MongoDb Cloud Atlas!");
    seedRoles().then(() => {
      seedAdminUser().then(() => {
        START_SERVER();
      });
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
