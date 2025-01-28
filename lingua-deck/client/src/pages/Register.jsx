import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { AuthContext } from "../context/authContext";

import Navbar from "../components/layout/Navbar";
import Toast from "../components/ui/Toast";
import FormInput from "../components/ui/FormInput";
import userAPI from "../api/userAPI";

export default function Register() {
  const { isLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  async function handleRegister(event) {
    event.preventDefault();
    const result = await userAPI.register({ username, email, password, preferred_language: preferredLanguage });
    if (result?.error) {
      setMessage(result.error.message);
    } else if (result?.data) {
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mt-5">
        <div className="px-2 flex flex-col gap-y-3 justify-center items-center">
          <Toast message={message} onClose={() => setMessage("")} type="error" />
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-y-2 w-full">
              <FormInput value={username} placeholder="username" onChange={setUsername} type="text" />
              <FormInput value={email} placeholder="email" onChange={setEmail} type="text" />
              <FormInput value={password} placeholder="password" onChange={setPassword} type="password" />
              <FormInput value={preferredLanguage} placeholder="lang code 'en'" onChange={setPreferredLanguage} type="text" />
            </div>
            <div className="flex justify-center">
              <button className="max-w-fit w-full mt-3 px-3 py-0.5 text-sm rounded-lg bg-[#826933] font-nunito text-[#eae8e3] font-medium" type="submit">
                Register
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm text-center font-nunito">or</p>
            <Link to="/login" className="text-stone-500 hover:text-stone-800 text-sm font-nunito">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
