import { useContext, useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { UserContext } from "../context/userContext";

export default function Profile() {
  const userProvider = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
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
          </div>
          <div className="flex justify-center">
            <button className="w-full mt-3 py-1 text-sm rounded-lg bg-[#826933] font-nunito font-extrabold text-[#eae8e3]" type="submit">
              Update
            </button>
          </div>
        </form>
        <div>
          <p className="text-center font-bold text-sm font-nunito">Your Attemp</p>
        </div>
        <div>
          <p className="text-center font-bold text-sm font-nunito">Your Card</p>
        </div>
      </div>
    </div>
  );
}
