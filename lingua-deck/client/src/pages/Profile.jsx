import { useContext, useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Navbar from "../components/layout/Navbar";
import { UserContext } from "../context/userContext";
import CardForm from "../components/card/CardForm";
import { FlashcardContext } from "../context/flashcardContext";
import Flashcard from "../components/card/Flashcard";

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

  useEffect(() => {
    async function getUser() {
      const result = await userProvider.get();
      if (result?.error) {
        setMessage("failed get your data");
      } else if (result?.data) {
        setUsername(result.data.username);
        setEmail(result.data.email);
        setPreferredLanguage(result.data.preferred_language);
        setUserFlashcards(result.data.flashcards);
        setStudySessions(result.data.study_sessions);
      }
    }
    getUser();
  }, [userProvider]);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await userProvider.update({ username, email, preferred_language: preferredLanguage });
    if (result?.error) {
      setMessage(result.error.message);
    } else {
      setMessage("");
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Menyimpan file yang dipilih ke state
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

  return (
    <div>
      <div className="px-2">
        <Navbar />
      </div>
      <div className="mt-14 px-3 flex flex-col gap-y-4 items-center">
        {message && (
          <div>
            <p className="text-sm font-nunito">{message}</p>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:gap-x-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-2 w-60">
              <p className="text-center font-bold text-sm font-nunito">Your Profile</p>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="text-center font-mono text-xs w-full py-1 rounded-lg outline-none" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="text-center font-mono text-xs w-full py-1 rounded-lg outline-none" />
              <input
                type="text"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                placeholder="language"
                className="text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
              />
              <div className="flex justify-center">
                <button className="w-full mt-3 py-1 text-sm rounded-lg bg-[#826933] font-nunito font-extrabold text-[#eae8e3]" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
          <div>
            <p className="text-center font-bold text-sm font-nunito">Study Session</p>
            <div className="font-nunito text-sm border border-stone-300 rounded p-3">
              <table>
                <thead>
                  <tr>
                    <th className="px-6">Date</th>
                    <th className="px-6">Total Card</th>
                    <th className="px-6">Total Correct</th>
                    <th className="px-6">Total Incorrect</th>
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
        <div>
          <div className="flex gap-x-2 justify-center items-center">
            <p className="text-center font-bold text-sm font-nunito">Your Card</p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-2 py-0 text-sm rounded-lg bg-lime-400 hover:bg-lime-500 shadow-lime-light hover:shadow-lime-normal border border-lime-600 font-nunito text-white"
            >
              +
            </button>
            <button
              onClick={() => setIsImport(true)}
              className="px-2 py-0 text-sm rounded-lg bg-lime-400 hover:bg-lime-500 shadow-lime-light hover:shadow-lime-normal border border-lime-600 font-nunito text-white"
            >
              Import
            </button>
          </div>
          <div>
            <div className="mt-3 flex flex-wrap justify-center gap-x-1 gap-y-1">
              {userFlashcards.map((flashcard, index) => (
                <div key={index} className="flex flex-col">
                  <Flashcard level={flashcard.level} category={flashcard.category} partOfSpeech={flashcard.part_of_speech} definition={flashcard.definition} username={username} />
                  <div className="flex gap-x-2 px-3">
                    <button
                      onClick={() => {
                        handleDelete(flashcard.card_id);
                      }}
                      className="w-full mt-3 py-1 text-xs rounded-lg bg-red-600 hover:bg-rose-700 shadow-rose-light hover:shadow-rose-normal border border-red-700 font-nunito font-bold text-white"
                    >
                      Delete
                    </button>
                    <button className="w-full mt-3 py-1 text-xs rounded-lg bg-lime-400 hover:bg-lime-500 shadow-lime-light hover:shadow-lime-normal border border-lime-600 font-nunito font-bold text-white">
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
