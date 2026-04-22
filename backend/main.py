from fastapi import FastAPI
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "running"}

@app.get("/test-gemini")
def test_gemini():
    response = model.generate_content("What is the capital of France?")
    return {"response": response.text}