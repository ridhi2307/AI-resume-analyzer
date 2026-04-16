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

    const resumeText = pdfData.text;

    // Calculate match score
    const score = calculateMatch(resumeText, jobDescription);

    res.json({
      message: "Analysis complete",
      matchScore: score + "%",
      preview: resumeText.substring(0, 200),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
});

function calculateMatch(resume, job) {
  const stopWords = ["the", "and", "is", "in", "of", "to", "a", "for", "with"];

  const synonyms = {
    ml: "machinelearning",
    machine: "machinelearning",
    learning: "machinelearning",
    ai: "artificialintelligence",
    js: "javascript",
  };

  const importantSkills = [
    "python",
    "machinelearning",
    "artificialintelligence",
    "react",
  ];

  function preprocess(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .map((word) => synonyms[word] || word)
      .filter((word) => !stopWords.includes(word));
  }

  const resumeWords = preprocess(resume);
  const jobWords = preprocess(job);

  const resumeSet = new Set(resumeWords);

  let matchScore = 0;

  jobWords.forEach((word) => {
    if (resumeSet.has(word)) {
      matchScore += importantSkills.includes(word) ? 2 : 1;
    }
  });
  if (jobWords.length === 0) return 0;

  return Math.floor((matchScore / jobWords.length) * 100);
}

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
