import { useContext, useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const { isLoggedIn, setIsLoggedIn, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(username, password);
    if (result?.error) {
      setMessage(result.error.message);
    } else {
      localStorage.setItem("token", result.data.token);
      setIsLoggedIn(true);
    }
  };
  return (
    <div>
      <div className="px-2">
        <Navbar />
      </div>
      <div className="px-2 flex flex-col border gap-y-3 justify-center items-center h-screen">
        {message && (
          <div>
            <p className="text-sm font-nunito">{message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 w-full">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="text-center font-mono text-xs w-full py-1 rounded-lg outline-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="text-center font-mono text-xs w-full py-1 rounded-lg outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full mt-3 py-1 text-sm rounded-lg bg-[#826933] font-nunito font-extrabold text-[#eae8e3]" type="submit">
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
  );
}
