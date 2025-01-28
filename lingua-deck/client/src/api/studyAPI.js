async function exportStudySession() {
  let response = await fetch(`${import.meta.env.VITE_API_URL}/api/export/study`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "study-session.csv";
  link.click();
  window.URL.revokeObjectURL(url);
}

export default { exportStudySession };
