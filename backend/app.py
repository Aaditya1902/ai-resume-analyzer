from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os
import pdfplumber

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Skills database
SKILLS_DB = [
    "python",
    "java",
    "c++",
    "javascript",
    "react",
    "node.js",
    "mongodb",
    "mysql",
    "sql",
    "html",
    "css",
    "tailwind",
    "fastapi",
    "django",
    "flask",
    "aws",
    "docker",
    "git",
    "github",
    "machine learning",
    "data science"
]

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend Running"}

@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # Save uploaded file
    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract PDF text
    extracted_text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()

            if text:
                extracted_text += text + "\n"

    # Lowercase text
    resume_text = extracted_text.lower()
    jd_text = job_description.lower()

    # Detect resume skills
    detected_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in resume_text:
            detected_skills.append(skill)

    # Detect job description skills
    jd_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in jd_text:
            jd_skills.append(skill)

    # Missing skills
    missing_skills = []

    for skill in jd_skills:
        if skill not in detected_skills:
            missing_skills.append(skill)

    # ATS Score
    documents = [resume_text, jd_text]

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity_score = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

    ats_score = round(similarity_score * 100, 2)

        # AI Suggestions
    suggestions = []

    if ats_score < 50:
        suggestions.append(
            "Your resume has a low ATS match. Try adding more keywords from the job description."
        )

    if len(missing_skills) > 0:
        suggestions.append(
            f"Consider adding these skills: {', '.join(missing_skills)}"
        )

    if "projects" not in resume_text:
        suggestions.append(
            "Add a projects section to strengthen your resume."
        )

    if "internship" not in resume_text:
        suggestions.append(
            "Add internship experience if available."
        )

    if "achievement" not in resume_text:
        suggestions.append(
            "Include measurable achievements and impact metrics."
        )

    return {
        "filename": file.filename,
        "skills_detected": detected_skills,
        "missing_skills": missing_skills,
        "ATS_score": f"{ats_score}%",
        "suggestions": suggestions,
        "extracted_text": extracted_text
    }