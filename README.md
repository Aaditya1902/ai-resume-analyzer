# 🚀 AI Resume Analyzer

An AI-powered Resume Analyzer built using **React, FastAPI, and NLP techniques** to evaluate ATS compatibility, extract technical skills, detect missing skills, and generate intelligent resume improvement suggestions.


## 🌐 Live Demo

Frontend: https://ai-resume-analyzer-livid-mu.vercel.app/p

Backend API Docs: https://ai-resume-analyzer-2seo.onrender.com

---

📌 Features

✅ Resume Upload (PDF)

✅ ATS Score Calculation

✅ Skill Extraction

✅ Missing Skills Detection

✅ AI Resume Suggestions

✅ Circular ATS Score Meter

✅ Modern Responsive UI

✅ Full Stack Deployment

---

🧠 ATS Score Calculation

The ATS score is calculated using:

* TF-IDF Vectorization
* Cosine Similarity

Formula used:   Cosine Similarity = (A · B) / (||A|| ||B||)

This compares the similarity between:

* Resume Content
* Job Description

---

🛠️ Tech Stack

Frontend:

* React
* Tailwind CSS
* Axios
* React Circular Progressbar
* Vite

Backend:

* FastAPI
* Python
* Scikit-learn
* PDFPlumber

Deployment:

* Vercel (Frontend)
* Render (Backend)

---

📂 Project Structure

```bash
ai-resume-analyzer/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── uploads/
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
---

⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```


## 🔹 Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## 🔹 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

🎯 Future Improvements

* Authentication System
* MongoDB Integration
* Resume History Dashboard
* AI Resume Rewriting
* OCR Support for Scanned Resumes
* Downloadable PDF Reports

---

👨‍💻 Author

Aaditya Singh Rawat

GitHub: https://github.com/Aaditya1902

