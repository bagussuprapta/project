import express from "express";
import userController from "../controllers/userController.js";
import flashcardController from "../controllers/flashcardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
privateRouter.get("/api/users/current", userController.get);
privateRouter.patch("/api/users/current", userController.update);
privateRouter.delete("/api/users/logout", userController.logout);

privateRouter.post("/api/flashcards", flashcardController.create);
privateRouter.post("/api/import/flashcards", upload.single("file"), flashcardController.importFlashcard);

export { privateRouter };
