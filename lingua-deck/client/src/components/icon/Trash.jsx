export default function Trash({ onClick }) {
  return (
    <svg onClick={onClick} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="15" height="18" fill="none" viewBox="0 0 15 18">
      <path
        fill="#C54E37"
        fillRule="evenodd"
        d="M4.5 18h5.4a3.6 3.6 0 0 0 3.6-3.6V4.5H.9v9.9A3.6 3.6 0 0 0 4.5 18m1.575-9.9a.675.675 0 1 0-1.35 0v6.3a.675.675 0 1 0 1.35 0zm3.6 0a.675.675 0 1 0-1.35 0v6.3a.675.675 0 0 0 1.35 0zM6.363 0a1.8 1.8 0 0 0-1.497.802L4.05 2.025H.675a.675.675 0 0 0 0 1.35h13.05a.675.675 0 1 0 0-1.35H10.35L9.534.802A1.8 1.8 0 0 0 8.037 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
