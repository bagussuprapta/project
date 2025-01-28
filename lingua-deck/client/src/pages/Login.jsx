import { useContext, useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/authContext";
import userAPI from "../api/userAPI";
import Toast from "../components/ui/Toast";

export default function Login() {
  const authProvider = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authProvider.isLoggedIn) {
      navigate("/profile");
    }
  }, [authProvider.isLoggedIn, navigate]);

  async function handleLogin(event) {
    event.preventDefault();
    const result = await userAPI.login(username, password);
    if (result?.error) {
      setMessage(result.error.message);
    } else {
      localStorage.setItem("token", result.data.token);
      authProvider.setIsLoggedIn(true);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mt-5">
        <div className="px-2 flex flex-col gap-y-3 justify-center items-center">
          <Toast message={message} onClose={() => setMessage("")} type="error" />
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-y-2 w-full">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="border text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="border text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
              />
            </div>
            <div className="flex justify-center">
              <button className="max-w-fit w-full mt-3 px-3 py-0.5 text-sm rounded-lg bg-[#826933] font-nunito text-[#eae8e3] font-medium" type="submit">
                Login
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm text-center font-nunito">or</p>
            <Link to="/register" className="text-stone-500 hover:text-stone-800 text-sm font-nunito">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
