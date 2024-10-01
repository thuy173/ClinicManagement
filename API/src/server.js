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

dotenv.config();

const START_SERVER = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/api", APIs);

  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      console.log(
        `3. Production: Server is running successfully at Port: ${process.env.PORT}`
      );
    });
  } else {
    const server = app.listen(
      env.LOCAL_DEV_APP_PORT,
      env.LOCAL_DEV_APP_HOST,
      () => {
        console.log(
          `3. Local Dev: Server is running successfully at host: ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`
        );
      }
    );
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
