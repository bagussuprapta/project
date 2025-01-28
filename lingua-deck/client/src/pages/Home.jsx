import Navbar from "../components/layout/Navbar";
import Toast from "../components/ui/Toast";
import Flashcard from "../components/card/Flashcard";
import { useCallback, useEffect, useState } from "react";
import flashcardAPI from "../api/flashcardAPI";

export default function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const fetchFlashcards = useCallback(async () => {
    const result = await flashcardAPI.getAll(currentPage, pageSize);
    if (result?.error) {
      setMessage("failed to get flashcards");
    } else if (result?.data) {
      setFlashcards(result.data);
      setTotalPages(result.meta.totalPages);
      setMessage("success to get flashcard");
    }
  }, [currentPage, pageSize]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setResetKey((prev) => prev + 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setResetKey((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards, currentPage, pageSize]);

  return (
    <div>
      <Toast message={message} onClose={() => setMessage("")} />
      <Navbar />
      <div className="mt-5">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <div className="flex flex-wrap justify-center gap-x-1 gap-y-1">
            {flashcards.map((flashcard, index) => (
              <div key={index}>
                <Flashcard
                  level={flashcard.level}
                  category={flashcard.category}
                  partOfSpeech={flashcard.part_of_speech}
                  definition={flashcard.definition}
                  username={flashcard.user.username}
                  reset={resetKey}
                  cardID={flashcard.card_id}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center items-center gap-4">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`px-2 text-sm font-nunito bg-gray-300 rounded ${currentPage === 1 ? "opacity-50" : ""}`}>
              Back
            </button>
            <span className="text-sm font-nunito">{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-2 text-sm font-nunito bg-gray-300 rounded ${currentPage === totalPages ? "opacity-50" : ""}`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
