import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start z-50 p-3 pointer-events-none">
      <p className="bg-opacity-20 border backdrop-blur-md text-white px-2 font-nunito text-sm rounded-full">{message}</p>
    </div>
  );
}
