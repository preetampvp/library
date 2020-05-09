import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";

import express, { Request, Response, NextFunction, Express } from "express";
import { BAD_REQUEST } from "http-status-codes";
import "express-async-errors";

import getRouter from "./routes";
import logger from "@shared/logger";

// Export express instance

const getServer = async () => {
  // Init express
  const app: Express = express();

  // Express Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(helmet());

  // Init DB
  const connectionString = process.env.DATABASE_CONNECTION_STRING;
  if (!!connectionString === false) {
    logger.error("Missing connection string.");
    process.exit(1);
  }
  await mongoose.connect(connectionString!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Add APIs
  const baseRouter = await getRouter();
  app.use("/api/v1/", baseRouter);

  // Print API errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  });

  return app;
};

export default getServer;
