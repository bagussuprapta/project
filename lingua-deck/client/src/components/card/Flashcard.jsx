import { Badge } from "../ui/Badge";
import Logo from "../icon/Logo";
import { useContext, useEffect, useState } from "react";
import { AttemptContext } from "../../context/attemptContext";
import ActionButton from "../ui/ActionButton";
import FormInput from "../ui/FormInput";

function BackCard({ handleFlip, level, category, partOfSpeech, username }) {
  return (
    <div onClick={handleFlip} className="h-full cursor-pointer flex flex-col gap-y-0 justify-between">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-1 items-center">
          <div className="h-6 w-6 bg-stone-800 rounded-lg"></div>
          <div>
            <p className="leading-none text-start font-nunito font-extrabold text-lg text-[#232222]">{category}</p>
            <p className="leading-none text-xs font-nunito text-stone-700">by: {username}</p>
          </div>
        </div>
        <div className="flex gap-x-1 overflow-hidden rounded">
          <Badge.Level level={level} />
          <Badge.Topic topic={partOfSpeech} />
        </div>
      </div>
      <div className="flex justify-center py-3">
        <Logo />
      </div>
      <div className="scale-x-[-1] scale-y-[-1]">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1 items-center">
            <div className="h-6 w-6 bg-stone-800 rounded-lg"></div>
            <div>
              <p className="leading-none text-start font-nunito font-extrabold text-lg text-[#232222]">{category}</p>
              <p className="leading-none text-xs font-nunito text-stone-700">by: {username}</p>
            </div>
          </div>
          <div className="flex gap-x-1 overflow-hidden rounded">
            <Badge.Level level={level} />
            <Badge.Topic topic={partOfSpeech} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FrontCard({ handleFlip, definition, cardID }) {
  const [message, setMessage] = useState("");
  const attemptProvider = useContext(AttemptContext);
  const [term, setTerm] = useState("");

  async function handleAttempt() {
    const result = await attemptProvider.attemptFlashcard(cardID, term);
    if (result?.error) {
      setMessage(result.error.message);
    } else if (result?.data) {
      setMessage(result.data.message);
    }
  }

  return (
    <div className="flex flex-col justify-between h-full py-2">
      <div>
        <p className="font-nunito text-sm text-center font-bold">Definition</p>
        <div className="h-24 px-1 border w-full bg-white rounded-lg flex flex-col justify-center">
          <p className="leading-[13px] text font-mono text-center">{definition}</p>
        </div>
      </div>
      <div>
        {message && <p className="font-nunito text-xs text-center">{message}</p>}
        <FormInput value={term} placeholder="term" onChange={setTerm} type="text" />
      </div>
      <div className="flex gap-x-2 items-center justify-center">
        <ActionButton onClick={handleFlip} text="Give Up" color="carmine" />
        <ActionButton onClick={handleAttempt} text="Try" color="liver" />
      </div>
    </div>
  );
}

export default function Flashcard({ level, category, partOfSpeech, definition, username, reset, cardID }) {
  const [isFlip, setIsFlip] = useState(true);

  function handleFlip() {
    setIsFlip(!isFlip);
  }

  useEffect(() => {
    setIsFlip(true);
  }, [reset]);

  return (
    <div className={`w-44 h-64 rounded-3xl py-2 px-3 border-b-[6px] border-[2px] border-stone-500 hover:border-stone-800 ${isFlip ? "bg-[#a7c3e4] hover:bg-[#9bb7d8]" : "bg-stone-100"}`}>
      {isFlip ? (
        <BackCard handleFlip={handleFlip} level={level} category={category} partOfSpeech={partOfSpeech} username={username} />
      ) : (
        <FrontCard handleFlip={handleFlip} definition={definition} cardID={cardID} />
      )}
    </div>
  );
}
