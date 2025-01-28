import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import userAPI from "../../api/userAPI";

export default function Navbar() {
  const authProvider = useContext(AuthContext);

  async function handleLogout() {
    userAPI.logout();
    localStorage.clear("token");
    authProvider.setIsLoggedIn(false);
  }

  return (
    <header className="px-48 mt-4 font-nunito text-white text-sm">
      <div className="flex gap-x-4 justify-between border-b-4 border-[#232222] bg-[#a4b9b5] rounded-2xl border-2 px-4 py-3">
        <div className="flex gap-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          {authProvider.isLoggedIn ? (
            <div className="flex gap-x-4">
              <Link to="/profile">Profile</Link>
              <Link className="bg-[#d5432c] px-2 rounded-md" onClick={handleLogout} to="/">
                Logout
              </Link>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
