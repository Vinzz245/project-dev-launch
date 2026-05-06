from xml.parsers.expat import model

from fastapi import FastAPI
from dotenv import load_dotenv
import os
import google.generativeai as genai
from routes.suggest import router as suggest_router
from routes.evaluate import router as evaluate_router
from routes.chat import router as chat_router
from routes.build import router as build_router
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()
app.include_router(suggest_router)
app.include_router(evaluate_router)
app.include_router(chat_router)
app.include_router(build_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"status": "running"}

@app.get("/test-gemini")
def test_gemini():
    response = model.generate_content("What is the capital of France?")
    return {"response": response.text}