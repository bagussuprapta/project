import { AuthContext } from "../context/authContext";
import authAPI from "../api/authAPI";
import { useState, useEffect } from "react";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function validateToken() {
      setIsLoggedIn(await authAPI.isTokenValid());
    }
    validateToken();
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
}
