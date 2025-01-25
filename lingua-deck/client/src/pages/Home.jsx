import Navbar from "../components/layout/Navbar";
import Flashcard from "../components/card/Flashcard";
import { useContext, useEffect, useState } from "react";
import { FlashcardContext } from "../context/flashcardContext";

export default function Home() {
  const flashcardProvider = useContext(FlashcardContext);
  const [flashcards, setFlashcards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function getFlashcard() {
      const result = await flashcardProvider.getAll(page, pageSize);
      if (!isMounted) return;
      if (result?.error) {
        setMessage("failed get flashcard");
      } else if (result?.data) {
        setFlashcards(result.data);
      }
    }
    getFlashcard();
    return () => {
      isMounted = false;
    };
  }, [flashcardProvider, page, pageSize]);

  return (
    <div>
      <div className="px-2">
        <Navbar />
      </div>
      <div className="mt-14 flex flex-wrap justify-center gap-x-1 gap-y-1">
        {flashcards.map((flashcard, index) => (
          <div key={index}>
            <Flashcard level={flashcard.level} category={flashcard.category} partOfSpeech={flashcard.part_of_speech} username={flashcard.user.username}></Flashcard>
          </div>
        ))}
      </div>
    </div>
  );
}
