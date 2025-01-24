import { FlashcardContext } from "../context/flashcardContext";
import flashcardAPI from "../api/flashcardAPI";

export default function FlashcardProvider({ children }) {
  async function create(payload) {
    return await flashcardAPI.create(payload);
  }

  const providerValue = { create };

  return <FlashcardContext.Provider value={providerValue}>{children}</FlashcardContext.Provider>;
}
