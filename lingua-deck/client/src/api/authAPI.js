async function isTokenValid() {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response.status === 200 ? true : false;
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

export default { isTokenValid, login };
