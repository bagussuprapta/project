import { UserContext } from "../context/userContext";
import userAPI from "../api/userAPI";

export default function UserProvider({ children }) {
  async function register(payload) {
    return await userAPI.register(payload);
  }

  const providerValue = {
    register,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}
