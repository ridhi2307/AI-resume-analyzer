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
  const resumeWords = resume.toLowerCase().split(/\W+/);
  const jobWords = job.toLowerCase().split(/\W+/);

  let matchCount = 0;

  jobWords.forEach((word) => {
    if (resumeWords.includes(word)) {
      matchCount++;
    }
  });

  return Math.floor((matchCount / jobWords.length) * 100);
}

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
