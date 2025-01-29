import { useState } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Flashcard from "./Flashcard";
import ActionButton from "../ui/ActionButton";
import Toast from "../ui/Toast";
import flashcardAPI from "../../api/flashcardAPI";
import FormInput from "../ui/FormInput";

const levelOption = ["beginner", "intermediate", "advance"];
const partOfSpeechOption = ["noun", "verb", "adjective", "adverb", "preposition"];

export default function CardForm({ setIsOpen, fetchFlashcard }) {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await flashcardAPI.create({
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
      fetchFlashcard();
    }
  }

  return (
    <div>
      <Toast message={message} onClose={() => setMessage("")} type="error" />
      <div className=" flex justify-center">
        <Flashcard category={category} level={level} partOfSpeech={partOfSpeech}></Flashcard>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2 mt-3 rounded-2xl border-b-[6px] bg-stone-100 p-5">
          <p className="font-nunito text-sm text-center">Fill this Form</p>
          <FormInput value={term} placeholder="term" onChange={setTerm} type="text" />
          <FormInput value={definition} placeholder="definition" onChange={setDefinition} type="text" />
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
          <FormInput value={category} placeholder="category" onChange={setCategory} type="text" />
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
          <FormInput value={exampleSentence} placeholder="example sentence if user answer right" onChange={setExampleSentence} type="text" />
          <div className="w-full flex gap-4 justify-center">
            <ActionButton onClick={() => setIsOpen(false)} text="Cancel" color="carmine" />
            <ActionButton text="Create" color="hookers" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
