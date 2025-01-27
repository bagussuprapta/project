async function attemptFlashcard(cardID, term) {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/attempt/flashcards/${cardID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ term: term }),
  });
  response = await response.json();
  return response;
}

export default { attemptFlashcard };
