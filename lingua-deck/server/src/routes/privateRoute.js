import express from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";
import flashcardController from "../controllers/flashcardController.js";
import attemptController from "../controllers/attemptController.js";
import studyController from "../controllers/studyController.js";

const upload = multer({ storage: multer.memoryStorage() });

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);

privateRouter.get("/api/users/current", userController.get);
privateRouter.patch("/api/users/current", userController.update);
privateRouter.delete("/api/users/logout", userController.logout);
privateRouter.get("/api/users/flashcards", flashcardController.getAllCreatedByUser);

privateRouter.post("/api/flashcards", flashcardController.create);
privateRouter.delete("/api/flashcards/:card_id", flashcardController.deleteCard);

privateRouter.post("/api/attempt/flashcards/:card_id", attemptController.attemptFlashcard);

privateRouter.post("/api/import/flashcards", upload.single("file"), flashcardController.importFlashcard);
privateRouter.get("/api/export/study", studyController.exportStudySession);

export { privateRouter };
