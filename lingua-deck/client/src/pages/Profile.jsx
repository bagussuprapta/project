import { useContext, useEffect, useState, useCallback } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Navbar from "../components/layout/Navbar";
import { UserContext } from "../context/userContext";
import CardForm from "../components/card/CardForm";
import { FlashcardContext } from "../context/flashcardContext";
import Flashcard from "../components/card/Flashcard";
import studyAPI from "../api/studyAPI";
import FormInput from "../components/ui/FormInput";
import userAPI from "../api/userAPI";
import Toast from "../components/ui/Toast";
import ActionButton from "../components/ui/ActionButton";
import Trash from "../components/icon/Trash";
import Pencil from "../components/icon/Pencil";
import flashcardAPI from "../api/flashcardAPI";

export default function Profile() {
  const userProvider = useContext(UserContext);
  const flashcardProvider = useContext(FlashcardContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [userFlashcards, setUserFlashcards] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFlashcards = useCallback(async () => {
    const result = await flashcardAPI.getAllCreatedByUser(currentPage, pageSize);
    if (result?.error) {
      setMessage("failed to get flashcards");
    } else if (result?.data) {
      setUserFlashcards(result.data);
      setTotalPages(result.meta.totalPages);
      setMessage("success to get flashcard");
    }
  }, [currentPage, pageSize]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards, currentPage, pageSize]);

  useEffect(() => {
    async function getUser() {
      const result = await userProvider.get();
      if (result?.error) {
        setMessage("failed get your data");
      } else if (result?.data) {
        setUsername(result.data.username);
        setEmail(result.data.email);
        setPreferredLanguage(result.data.preferred_language);
        setStudySessions(result.data.study_sessions);
      }
    }
    getUser();
  }, [message, userProvider]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleImport(event) {
    event.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    await flashcardProvider.importFlashcards(formData);
    setIsImport(false);
  }

  async function handleDelete(cardID) {
    await flashcardProvider.deleteFlashcard(cardID);
  }

  async function handleExportStudySession() {
    await studyAPI.exportStudySession();
  }

  async function handleUpdateUser(event) {
    event.preventDefault();
    const result = await userAPI.update({ username, email, preferred_language: preferredLanguage });
    if (result?.error) {
      setMessageType("error");
      setMessage(result.error.message);
    } else {
      setMessageType("");
      setMessage("success update");
    }
  }

  return (
    <div>
      <Navbar />
      <Toast message={message} onClose={() => setMessage("")} type={messageType} />
      <div className="mt-5 px-80">
        <div className="flex gap-x-3">
          <div className="border px-5 py-3 rounded-2xl border-b-[6px] bg-stone-100">
            <p className="text-center font-bold text-sm font-nunito">Your Profile</p>
            <form onSubmit={handleUpdateUser} className="mt-3">
              <div className="flex flex-col gap-y-1 w-56">
                <FormInput type="text" value={username} onChange={setUsername} placeholder="username" />
                <FormInput type="text" value={email} onChange={setEmail} placeholder="email" />
                <FormInput type="text" value={preferredLanguage} onChange={setPreferredLanguage} placeholder="lang code 'en'" />
              </div>
              <div className="mt-3 flex justify-center">
                <ActionButton type="submit" text="Update" color="chestnut" />
              </div>
            </form>
          </div>
          <div className="w-full border px-6 py-3 rounded-2xl border-b-[6px] bg-stone-100">
            <div className="flex items-center justify-center gap-x-3">
              <p className="font-bold text-sm font-nunito">Study Session</p>
              <ActionButton text="Export" color="liver" onClick={handleExportStudySession} />
            </div>
            <div className="text-sm font-nunito border rounded-md mt-3">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-10 bg-stone-200">Date</th>
                    <th className="px-2 bg-stone-200">Total Card</th>
                    <th className="px-2 bg-stone-200">Total Correct</th>
                    <th className="px-2 bg-stone-200">Total Incorrect</th>
                  </tr>
                </thead>
                <tbody>
                  {studySessions.map((session, index) => {
                    let date = session.session_date;
                    date = new Date(date);
                    date = date.toISOString().split("T")[0];
                    return (
                      <tr key={index}>
                        <td className="text-center">{date}</td>
                        <td className="text-center">{session.total_cards}</td>
                        <td className="text-center">{session.total_correct}</td>
                        <td className="text-center">{session.total_incorrect}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/** Flashcard */}
      <div className="mt-5 px-11">
        <div className="flex gap-x-3 items-center justify-center">
          <p className="font-bold text-sm font-nunito">Your Flashcards</p>
          <ActionButton
            text="Add"
            color="hookers"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <ActionButton text="Import" color="liver" onClick={() => setIsImport(true)} />
        </div>
        <div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-1 gap-y-1">
            {userFlashcards.map((flashcard, index) => (
              <div key={index} className="flex flex-col">
                <Flashcard level={flashcard.level} category={flashcard.category} partOfSpeech={flashcard.part_of_speech} definition={flashcard.definition} username={username} />
                <div className="flex justify-center items-center gap-x-7 mt-2">
                  <Trash
                    onClick={() => {
                      handleDelete(flashcard.card_id);
                    }}
                  />
                  <Pencil />
                </div>
              </div>
            ))}
          </div>
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
      <div className="mt-14 px-3 flex flex-col gap-y-4 items-center">
        <div>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <DialogPanel>
              <div className="fixed inset-0 items-center justify-center bg-stone-400 bg-opacity-60 flex">
                <div className="w-80 flex flex-col gap-y-3">
                  <div className="bg-white px-4 w-full py-3 pb-5 rounded-3xl border">
                    <div className=" w-full">
                      <p className="text-center font-nunito text-sm">Create Your Card</p>
                    </div>
                    <div className="flex justify-center">
                      <CardForm setIsOpen={setIsOpen}></CardForm>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
          <Dialog open={isImport} onClose={() => setIsImport(false)} className="relative z-50">
            <DialogPanel>
              <div className="fixed inset-0 items-center justify-center bg-stone-400 bg-opacity-60 flex">
                <div className="w-80 flex flex-col gap-y-3">
                  <div className="bg-white px-4 w-full py-3 pb-3 rounded-3xl border">
                    <div className=" w-full">
                      <p className="text-center font-nunito text-sm">Import Your Card</p>
                    </div>
                    <div className="flex justify-center">
                      <div>
                        <form onSubmit={handleImport}>
                          <input type="file" onChange={handleFileChange} />
                          <div className="w-full flex gap-4 justify-center">
                            <button
                              onClick={() => {
                                setIsImport(false);
                              }}
                              className="font-nunito text-sm bg-rose-700 text-white px-2 py-0.5 rounded"
                            >
                              Cancel
                            </button>
                            <button className="font-nunito text-sm bg-[#826933] text-white px-2 py-0.5 rounded">Import</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
