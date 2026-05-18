import { useState } from "react";
import axios from "axios";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("job_description", jobDescription);

    setLoading(true);

    try {

      const response = await axios.post(
        "https://ai-resume-analyzer-2seo.onrender.com/analyze-resume",
        formData
      );

      setResult(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      alert("Error analyzing resume");
    
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 p-10">

<div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl">

<h1 className="text-5xl font-extrabold text-center mb-10 text-white">
          AI Resume Analyzer
          <p className="text-center text-gray-300 mt-3 text-lg">
  Analyze your resume with AI-powered ATS scoring
</p>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block font-semibold mb-2 text-white">
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-white/20 text-white border border-white/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-white">
              Job Description
            </label>

            <textarea
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-white/20 text-white border border-white/20 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Paste job description here..."
              required
            />
          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black py-4 rounded-xl text-lg font-bold disabled:opacity-50"
>
  {loading ? "Analyzing Resume..." : "Analyze Resume"}
</button>

        </form>

        {result && (

<div className="mt-10 space-y-6 animate-pulse">

<div className="bg-white/10 border border-white/20 p-8 rounded-xl flex flex-col items-center">

<h2 className="text-2xl font-bold mb-6">
  ATS Score
</h2>

<div className="w-40 h-40">

  <CircularProgressbar
    value={parseFloat(result.ATS_score)}
    text={result.ATS_score}
  />

</div>

</div>

            <div className="bg-white/10 border border-white/20 p-5 rounded-xl">

              <h2 className="text-xl font-bold text-white mb-3">
                Skills Detected
              </h2>

              <div className="flex flex-wrap gap-2">

                {result.skills_detected.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-cyan-500 text-black font-semibold px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-5 rounded-xl">

              <h2 className="text-xl font-bold text-white mb-3">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-2">

                {result.missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-pink-500 text-white font-semibold px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            </div>

            <div className="bg-yellow-100 p-5 rounded-xl">

  <h2 className="text-xl font-bold text-white mb-3">
    AI Suggestions
  </h2>

  <ul className="space-y-2">

    {result.suggestions.map((suggestion, index) => (
      <li
        key={index}
        className="bg-yellow-400 text-black font-medium p-3 rounded-lg"
      >
        {suggestion}
      </li>
    ))}

  </ul>

</div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;