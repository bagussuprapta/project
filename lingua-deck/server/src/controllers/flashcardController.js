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

export default { create, get };
