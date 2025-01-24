import { useContext, useState } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { FlashcardContext } from "../../context/flashcardContext";
import Flashcard from "./Flashcard";

const levelOption = ["beginner", "intermediate", "advance"];
const partOfSpeechOption = ["noun", "verb", "adjective", "adverb", "preposition"];

export default function CardForm({ setIsOpen }) {
  const flashcardProvider = useContext(FlashcardContext);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await flashcardProvider.create({
      term,
      definition,
      level,
      category,
      part_of_speech: partOfSpeech,
      example_sentence: exampleSentence,
    });
    if (result?.error) {
      setMessage(result.error.message);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <div>
      <div className=" flex justify-center">
        <Flashcard></Flashcard>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2 mt-3">
          <p className="font-nunito text-sm text-center">Fill this Form</p>
          {message && <p className="text-sm text-center text-red-400 font-nunito">{message}</p>}
          <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="term" className=" border text-center font-mono text-xs w-full py-1 rounded-lg outline-none" />
          <input
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="definition"
            className="border text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
          />
          <RadioGroup value={level} onChange={setLevel}>
            <div className="text-sm font-nunito flex justify-center gap-x-2">
              {levelOption.map((option) => (
                <Field key={option} className="flex items-center gap-x-1">
                  <Radio value={option} className="flex size-3 items-center justify-center rounded-full border border-[#542f18] bg-white data-[checked]:bg-[#542f18]">
                    <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                  </Radio>
                  <Label>{option}</Label>
                </Field>
              ))}
            </div>
          </RadioGroup>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="category"
            className="border text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
          />
          <RadioGroup value={partOfSpeech} onChange={setPartOfSpeech}>
            <div className="text-sm font-nunito flex flex-wrap justify-center gap-x-1 gap-y-1">
              {partOfSpeechOption.map((option) => (
                <Field key={option} className="flex items-center gap-x-1">
                  <Radio value={option} className="flex size-3 items-center justify-center rounded-full border border-[#542f18] bg-white data-[checked]:bg-[#542f18]">
                    <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                  </Radio>
                  <Label>{option}</Label>
                </Field>
              ))}
            </div>
          </RadioGroup>
          <input
            type="text"
            value={exampleSentence}
            onChange={(e) => setExampleSentence(e.target.value)}
            placeholder="example"
            className="border text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
          />
          <div className="w-full flex gap-4 justify-center">
            <button className="font-nunito text-sm bg-rose-700 text-white px-2 py-0.5 rounded" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="font-nunito text-sm bg-[#826933] text-white px-2 py-0.5 rounded" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
