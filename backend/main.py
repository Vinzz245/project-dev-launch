from xml.parsers.expat import model

from fastapi import FastAPI
from dotenv import load_dotenv
import os
import google.generativeai as genai
from routes.suggest import router as suggest_router

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


app = FastAPI()
app.include_router(suggest_router)

@app.get("/")
def read_root():
    return {"status": "running"}

@app.get("/test-gemini")
def test_gemini():
    response = model.generate_content("What is the capital of France?")
    return {"response": response.text}