import attemptService from "../services/attemptService.js";

const attemptFlashcard = async (request, response, next) => {
  try {
    const result = await attemptService.attemptFlashcard(request.user, request.params, request.body);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { attemptFlashcard };
