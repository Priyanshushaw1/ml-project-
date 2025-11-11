async function getRecommendation() {
  const interests = document.getElementById("interests").value.split(",");

  try {
    const response = await fetch("https://your-node-server.onrender.com/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ interests }),
});
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    document.getElementById("output").innerText =
      "Recommended Group: " + data.group;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("output").innerText = "Error: " + error.message;
  }
}
