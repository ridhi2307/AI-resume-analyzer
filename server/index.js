require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: "uploads/" });

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!!");
});

// Resume upload + parse route
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const jobDescription = req.body.jobDescription || "";

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const resumeFromFile = pdfData.text;
    const resumeFromText = req.body.text; // 👈 textarea input

    // ✅ choose input (priority: typed text)
    const finalResume =
      resumeFromText && resumeFromText.trim() !== ""
        ? resumeFromText
        : resumeFromFile;

    // Calculate match score
    const score = calculateMatch(finalResume, jobDescription);

    res.json({
      message: "Analysis complete",
      matchScore: score + "%",
      preview: finalResume.substring(0, 200),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
});

function calculateMatch(resume, job) {
  console.log("RESUME TEXT 👉", resume);
  const importantSkills = [
    "python",
    "machine learning",
    "artificial intelligence",
    "react",
    "javascript",
  ];

  if (!resume || resume.trim().length === 0) {
    return 0;
  }

  const normalize = (text) => text.toLowerCase().replace(/[^\w\s]/g, "");

  const resumeText = normalize(resume);
  const resumeWords = resumeText.split(/\s+/);

  // 🚨 Detect gibberish (very important)
  if (resumeWords.length < 3) {
    return 0;
  }

  let matchScore = 0;

  importantSkills.forEach((skill) => {
    const cleanSkill = normalize(skill);

    // ✅ 1. exact phrase match
    const phraseMatch = resumeText.includes(cleanSkill);

    // ✅ 2. word-based match
    const skillWords = cleanSkill.split(" ");
    const wordMatch = skillWords.every((word) => resumeWords.includes(word));

    if (phraseMatch || wordMatch) {
      matchScore++;
    }
  });

  const score = (matchScore / importantSkills.length) * 100;

  return Math.round(score);
}
//const testResume = "I have experience in Python, React and Machine Learning";

//console.log("Test Score:", calculateMatch(testResume, ""));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
