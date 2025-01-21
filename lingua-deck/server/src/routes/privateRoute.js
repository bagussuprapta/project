import express from "express";
import userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
privateRouter.get("/api/users/current", userController.get);

export { privateRouter };
