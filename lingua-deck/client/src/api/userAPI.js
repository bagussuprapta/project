async function register(payload) {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });
  response = await response.json();
  return response;
}

async function login(username, password) {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ username, password }),
  });
  response = await response.json();
  return response;
}

async function logout() {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  response = await response.json();
  return response;
}

export default { register, login, logout };
