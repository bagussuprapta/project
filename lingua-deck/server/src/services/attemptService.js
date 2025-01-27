import { prismaClient } from "../apps/database.js";
import { getFlashcardValidation } from "../validations/flashcardValidation.js";
import { ResponseError } from "../errors/responseError.js";
import { validator } from "../validations/validator.js";
import { attemptFlashcardValidation } from "../validations/attemptValidation.js";

const attemptFlashcard = async (user, params, body) => {
  const validatedFlashcard = validator(getFlashcardValidation, { card_id: params.card_id });
  const validatedAttemptTerm = validator(attemptFlashcardValidation, body);
  const queriedFlashcard = await prismaClient.flashcard.findFirst({
    where: {
      card_id: validatedFlashcard.card_id,
    },
  });
  if (!queriedFlashcard) {
    throw new ResponseError(404, "flashcard not found");
  }
  if (user.user_id === queriedFlashcard.user_id) {
    throw new ResponseError(403, "you cannot attempt your own flashcard");
  }

  const hasAttempted = await prismaClient.flashcardAttempt.findFirst({
    where: {
      user_id: user.user_id,
      card_id: queriedFlashcard.card_id,
    },
  });

  if (hasAttempted) {
    throw new ResponseError(409, "you have already attempted this flashcard.");
  }

  const termAnswer = queriedFlashcard.term.split(", ").map((word) => word.trim());
  const isCorrect = termAnswer.includes(validatedAttemptTerm.term);

  if (isCorrect) {
    await prismaClient.flashcardAttempt.create({
      data: {
        user_id: user.user_id,
        card_id: queriedFlashcard.card_id,
        attempt_status: "correct",
      },
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const existingSession = await prismaClient.studySession.findFirst({
    where: {
      user_id: user.user_id,
      session_date: {
        gte: today,
        lte: endOfDay,
      },
    },
  });

  let updatedStudySession = null;
  let createdStudySession = null;
  if (existingSession) {
    updatedStudySession = await prismaClient.studySession.update({
      where: { session_id: existingSession.session_id },
      data: {
        total_cards: existingSession.total_cards + 1,
        total_correct: existingSession.total_correct + (isCorrect ? 1 : 0),
        total_incorrect: existingSession.total_incorrect + (isCorrect ? 0 : 1),
      },
      select: {
        total_cards: true,
        total_correct: true,
        total_incorrect: true,
      },
    });
  } else {
    createdStudySession = await prismaClient.studySession.create({
      data: {
        user_id: user.user_id,
        total_cards: 0,
        total_correct: 0,
        total_incorrect: 0,
      },
      select: {
        total_cards: true,
        total_correct: true,
        total_incorrect: true,
      },
    });
  }

  return {
    message: isCorrect ? "correct! great job!" : "incorrect, try again!",
    stats: updatedStudySession ? updatedStudySession : createdStudySession,
  };
};

export default { attemptFlashcard };
