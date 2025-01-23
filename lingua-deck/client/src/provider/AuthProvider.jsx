import { AuthContext } from "../context/authContext";
import authAPI from "../api/authAPI";
import { useState, useEffect } from "react";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") && setIsLoggedIn(true);
  }, [isLoggedIn]);

  async function login(username, password) {
    return await authAPI.login(username, password);
  }

  async function logout() {
    await authAPI.logout();
    setIsLoggedIn(false);
    localStorage.clear("token");
  }

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
}
