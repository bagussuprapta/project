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

export default { register };
