import express from "express";
import userController from "../controllers/userController.js";
import flashcardController from "../controllers/flashcardController.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

publicRouter.get("/api/flashcards/:card_id", flashcardController.get);
publicRouter.get("/api/flashcards", flashcardController.getAll);

export { publicRouter };
