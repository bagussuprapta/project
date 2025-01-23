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

export default { isTokenValid };
