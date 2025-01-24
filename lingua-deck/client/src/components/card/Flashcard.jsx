import { Badge } from "../ui/Badge";
import Logo from "../icon/Logo";

export default function Flashcard() {
  return (
    <div className="w-44 cursor-pointer rounded-3xl py-2 px-3 border-b-[6px] border-[2px] border-stone-600 hover:border-stone-800 bg-[#a7c3e4] flex flex-col gap-y-0 justify-between">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-1 items-center">
          <div className="h-6 w-6 bg-stone-800 rounded-lg"></div>
          <div>
            <p className="leading-none text-start font-nunito font-extrabold text-lg text-[#232222]">Daily Life</p>
            <p className="leading-none text-xs font-nunito text-stone-700">by: bagussuprapta</p>
          </div>
        </div>
        <div className="flex gap-x-1 overflow-hidden rounded">
          <Badge.Level level="beginner" />
          <Badge.Topic topic="noun" />
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
              <p className="leading-none text-start font-nunito font-extrabold text-lg text-[#232222]">Daily Life</p>
              <p className="leading-none text-xs font-nunito text-stone-700">by: bagussuprapta</p>
            </div>
          </div>
          <div className="flex gap-x-1 overflow-hidden rounded">
            <Badge.Level level="beginner" />
            <Badge.Topic topic="noun" />
          </div>
        </div>
      </div>
    </div>
  );
}
