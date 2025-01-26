import flashcardService from "../services/flashcardService.js";

const create = async (request, response, next) => {
  try {
    const result = await flashcardService.create(request.user, request.body);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const importFlashcard = async (request, response, next) => {
  try {
    const result = await flashcardService.importFlashcard(request.user, request);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const result = await flashcardService.get(request.params);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const result = await flashcardService.getAll(request.query);
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (request, response, next) => {
  try {
    const result = await flashcardService.deleteCard(request.user, request.params);
    response.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export default { create, importFlashcard, get, getAll, deleteCard };
