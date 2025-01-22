import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-1 right-1 z-50">
      <div className="flex gap-x-4 justify-between border-b-4 font-mono border-[#232222] bg-[#37463c] rounded-b-2xl border-x-2 px-4 py-3">
        <ol className="flex gap-x-4">
          <li>
            <Link className="text-[#b6cde8] hover:text-white" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-[#b6cde8] hover:text-white" to="/about">
              About
            </Link>
          </li>
        </ol>
        <ol>
          <li>
            <Link className="text-[#b6cde8] hover:text-white" to="/profile">
              Profile
            </Link>
          </li>
        </ol>
      </div>
    </header>
  );
}
