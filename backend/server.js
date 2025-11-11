const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const FLASK_URL = "https://ml-recommendation-api.onrender.com"; // 🧠 Flask deployed URL

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Node server is running and connected to Flask ML model!" });
});

app.post("/predict", async (req, res) => {
  try {
    const { interests } = req.body;
    const response = await axios.post(`${FLASK_URL}/predict`, { interests });
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error connecting to Flask model:", error.message);
    res.status(500).json({ error: "Unable to connect to ML model" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Node Server running at http://localhost:${PORT}`);
});
