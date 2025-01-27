import Navbar from "../components/layout/Navbar";
import Flashcard from "../components/card/Flashcard";
import { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../context/flashcardContext";

export default function Home() {
  const flashcardProvider = useContext(FlashcardContext);
  const [flashcards, setFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(16);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const fetchFlashcard = async () => {
      const result = await flashcardProvider.getAll(currentPage, pageSize);
      if (result?.error) {
        setMessage("Failed to get flashcards");
      } else if (result?.data) {
        setFlashcards(result.data);
        setTotalPages(result.meta.totalPages);
      }
    };
    fetchFlashcard();
  }, [flashcardProvider, currentPage, pageSize]);

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

  return (
    <div>
      <div className="px-2">
        <Navbar />
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-x-1 gap-y-1">
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

      <div className="mt-8 mb-8 flex justify-center items-center gap-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`px-2 text-sm font-nunito bg-gray-300 rounded ${currentPage === 1 ? "opacity-50" : ""}`}>
          Back
        </button>
        <span className="text-sm font-nunito">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-2 text-sm font-nunito bg-gray-300 rounded ${currentPage === totalPages ? "opacity-50" : ""}`}>
          Next
        </button>
      </div>
      {message && <div className="mt-4 text-center text-red-500 font-semibold">{message}</div>}
    </div>
  );
}
