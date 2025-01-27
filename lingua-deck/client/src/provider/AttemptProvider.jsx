import attemptAPI from "../api/attemptAPI";
import { AttemptContext } from "../context/attemptContext";

export default function AttemptProvider({ children }) {
  async function attemptFlashcard(cardID, term) {
    return await attemptAPI.attemptFlashcard(cardID, term);
  }

  const providerValue = { attemptFlashcard };

  return <AttemptContext.Provider value={providerValue}>{children}</AttemptContext.Provider>;
}
