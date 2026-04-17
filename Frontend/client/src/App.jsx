import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Resume Analyzer</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br />
      <br />

      <textarea
        placeholder="Enter job description"
        rows="5"
        cols="50"
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>Analyze</button>

      <br />
      <br />

      {result && (
        <div>
          <h3>Match Score: {result.matchScore}</h3>
          <p>{result.preview}</p>
        </div>
      )}
    </div>
  );
}

export default App;
