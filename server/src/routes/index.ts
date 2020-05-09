import { Router } from "express";
import booksRouter from "./books";
import { Mongoose } from "mongoose";

const getRouter = async (): Promise<Router> => {
  const router = Router();
  router.use("/books", booksRouter);
  return router;
};

export default getRouter;
