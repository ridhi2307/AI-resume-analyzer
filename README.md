# AI Resume Analyzer & Job Matcher

This project is a backend-based application designed to analyze resumes and evaluate how well they match a given job description. It allows users to upload a resume in PDF format, extract its content, and compare it with job requirements to generate a match score.

The goal of this project is to simulate a basic Applicant Tracking System (ATS) that helps in understanding how resumes are filtered and evaluated in real-world hiring processes.

---

## 🔍 What This Project Does

- Accepts resume uploads in PDF format  
- Extracts and processes text from the resume  
- Takes a job description as input  
- Compares resume content with job requirements  
- Generates a match score based on keyword similarity  

This provides a simple and effective way to evaluate how aligned a resume is with a specific job role.

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js

**Libraries Used:**
- Multer – for handling file uploads  
- pdf-parse – for extracting text from PDF files  
- CORS – for handling cross-origin requests  
- Dotenv – for managing environment variables  

**Optional Integration:**
- OpenAI API (for AI-based suggestions and improvements)

---

## 📁 Project Structure


ai-resume-analyzer/
│
├── server/
│ ├── uploads/
│ ├── index.js
│ ├── package.json
│ └── .env
│
├── client/ (frontend to be added)
│
├── .gitignore
└── README.md


---

## 🎯 Purpose of the Project

This project is built as a learning and demonstration tool to understand:

- How backend systems handle file uploads  
- How text extraction from documents works  
- How basic matching algorithms are implemented  
- How real-world resume screening systems function  

---

## 🚀 Future Scope

- Adding a React-based frontend interface  
- Improving the matching algorithm  
- Integrating AI for detailed feedback and suggestions  
- Building a complete dashboard experience  

---

## 👤 Author

Ridhima Singh