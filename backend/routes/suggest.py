from fastapi import APIRouter
from models.schemas import suggestRequest
import google.generativeai as genai
import json
import os

router = APIRouter()


@router.post("/suggest")
def suggest_projects(req: suggestRequest):
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
    prompt = f"""
    You are an expert project advisor.
    Given the following profile of a developer, suggest 3 project ideas that they can work on to improve their skills and gain experience in their areas of interest.

    Skills: {req.skills}
    Interests: {req.interests}
    Experience level: {req.experience}
    Time Available: {req.time_available}

    Return ONLY the project ideas in a JSON format. Do not include any explanations or additional text. Each project idea should include a name, a brief description, the skills required, and an estimated time to complete.
    Each object must have the following fields: 
    - name: Project name
    - description: A one-sentence description of the project
    - why_it_fits: A brief explanation of why this project is a good fit for the developer based on their profile
    - resume_impact: high/medium/low - An assessment of how impactful this project would be on the developer's resume
    - learning_value: high/medium/low - An assessment of how much the developer would learn from this project
    - uniqueness: high/medium/low - An assessment of how unique this project idea is compared to common projects in the same domain
    - estimated_time: An estimate of how long it would take to complete the project (e.g., "2 weeks", "1 month")

    Example format:
    [
        {{
            "name": "Project Name",
            "description": "One sentence description",
            "why_it_fits": "Because ...",
            "resume_impact": "high",
            "learning_value": "medium",
            "uniqueness": "high",
            "estimated_time": "2 weeks"
        }}
    ]
    """
    
    response = model.generate_content(prompt)
    cleaned_response = response.text.strip().replace("```json", "").replace("```", "").strip()
    
    try:
        project_ideas = json.loads(cleaned_response)
        return {"project_ideas": project_ideas}
    except json.JSONDecodeError:
        return {"error": "Failed to parse response from Gemini", "raw_response": response.text}