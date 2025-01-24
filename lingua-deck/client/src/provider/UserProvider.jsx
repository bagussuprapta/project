import { UserContext } from "../context/userContext";
import userAPI from "../api/userAPI";

export default function UserProvider({ children }) {
  async function register(payload) {
    return await userAPI.register(payload);
  }

  async function login(username, password) {
    return await userAPI.login(username, password);
  }

  async function get() {
    return await userAPI.get();
  }

  async function update(payload) {
    return await userAPI.update(payload);
  }

  async function logout() {
    await userAPI.logout();
  }

  const providerValue = {
    register,
    login,
    get,
    update,
    logout,
  };

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}
