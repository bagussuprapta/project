import { FlashcardContext } from "../context/flashcardContext";
import flashcardAPI from "../api/flashcardAPI";

export default function FlashcardProvider({ children }) {
  async function create(payload) {
    return await flashcardAPI.create(payload);
  }

  async function importFlashcards(payload) {
    return await flashcardAPI.importFlashcard(payload);
  }

  async function getAll(page, pageSize) {
    return await flashcardAPI.getAll(page, pageSize);
  }

  const providerValue = { create, importFlashcards, getAll };

  return <FlashcardContext.Provider value={providerValue}>{children}</FlashcardContext.Provider>;
}
