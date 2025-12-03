const express = require("express");
const cors = require("cors");
const players = require("./data/players");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let currentIndex = 0;

function makeResponse(index) {
  return {
    index,
    player: players[index],
    total: players.length
  };
}

app.get("/players", (req, res) => {
  if (!players.length) return res.status(500).json({ error: "No players available" });
  res.json(makeResponse(currentIndex));
});

app.get("/players/next", (req, res) => {
  if (!players.length) return res.status(500).json({ error: "No players available" });
  currentIndex = (currentIndex + 1) % players.length;
  res.json(makeResponse(currentIndex));
});

app.get("/players/prev", (req, res) => {
  if (!players.length) return res.status(500).json({ error: "No players available" });
  currentIndex = (currentIndex - 1 + players.length) % players.length;
  res.json(makeResponse(currentIndex));
});

app.get("/players/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id) || id < 0 || id >= players.length) {
    return res.status(400).json({ error: "Invalid player id" });
  }
  currentIndex = id;
  res.json(makeResponse(currentIndex));
});

app.listen(PORT, () => {
  console.log(`Blue Jays backend running on http://localhost:${PORT}`);
});