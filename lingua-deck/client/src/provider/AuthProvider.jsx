import { AuthContext } from "../context/authContext";
import { useState, useEffect } from "react";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") && setIsLoggedIn(true);
  }, [isLoggedIn]);

  const providerValue = { isLoggedIn, setIsLoggedIn };

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}
