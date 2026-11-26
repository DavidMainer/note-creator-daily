import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let notes = [];
let nextId = 1;

app.post("/api/notes", (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Please write a note first." });
  }

  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const note = {
    id: nextId++,
    day: dayName,
    text: text.trim()
  };

  notes.unshift(note);
  res.status(201).json(note);
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.listen(3000, () => console.log("Notes server running on port 3000"));