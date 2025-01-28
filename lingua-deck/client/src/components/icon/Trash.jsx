export default function Trash({ onClick }) {
  return (
    <svg onClick={onClick} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="none" viewBox="0 0 16 20">
      <path
        fill="#a22e2b"
        fillRule="evenodd"
        d="M5.406.89A2 2 0 0 1 7.07 0h1.86a2 2 0 0 1 1.664.89l.906 1.36h3.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5H4.5zM11 20H5a4 4 0 0 1-4-4V5h14v11a4 4 0 0 1-4 4M6 8.25a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0V9A.75.75 0 0 1 6 8.25m4 0a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
