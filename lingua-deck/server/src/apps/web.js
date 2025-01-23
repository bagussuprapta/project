import express from "express";
import cors from "cors";
import { publicRouter } from "../routes/publicRoute.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";
import { privateRouter } from "../routes/privateRoute.js";

export const web = express();
web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);
