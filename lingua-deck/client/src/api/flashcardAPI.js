async function create(payload) {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/flashcards`, {
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

async function getAll(page, pageSize) {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/flashcards?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  return response;
}

export default { create, getAll };
