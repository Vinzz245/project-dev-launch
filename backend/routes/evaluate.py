from fastapi import APIRouter
from models.schemas import evaluateRequest
import google.generativeai as genai
import json
import os

router = APIRouter()

@router.post("/evaluate")
def evaluate_project(req: evaluateRequest):
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
    prompt = f"""
    You are an expert project evaluator who is brutally honest and fair.
    Given the following project idea and the profile of a developer, evaluate how suitable this project is for the developer based on their skills, experience, and time availability.

    Project Idea: {req.project_idea}
    Skills: {req.skills}
    Experience level: {req.experience}
    Time Available: {req.time_available}

    Return ONLY the evaluation in a JSON format. Do not include any explanations or additional text. The evaluation should include the following fields:
    - summary: A 2-3 sentence honest opinion summarizing the evaluation of this project idea for the developer also stating the main reasons for the verdict
    - verdict: "proceed/modify/drop" - A clear verdict on whether the developer should proceed with this project as-is, modify it to make it more feasible, or drop it entirely and consider alternatives
    - complexity_score: A score from 1 to 10 assessing the complexity of the project idea
    - overall_feasibility: high/medium/low - An assessment of how feasible it is for the developer to complete this project given their profile and the project requirements
    - learning_value: high/medium/low - An assessment of how much the developer would learn from this project
    - resume_impact: high/medium/low - An assessment of how impactful this project would be on the developer's resume
    - estimated_time: An estimate of how long it would take to complete the project (e.g., "2 weeks", "1 month")
    - tasks: list of tasks required to complete the project idea, with each task having a name, estimated time to complete and difficulty level (easy/medium/hard)
    - skill_gaps: A list of specific skills that the developer would need to learn or improve in order to successfully complete this project, along with resources for learning those skills
    - risk_flags: A list of potential challenges or obstacles the developer might face when working on this project, along with severity levels and suggestions for how to mitigate those risks
    - recommendations: A list of specific recommendations for how the developer can increase their chances of successfully completing this project, such as additional learning resources, potential collaborators, or strategies for breaking down the project into manageable tasks
    - alternatives: If the verdict is "drop", include 2-3 alternative project ideas that are more suitable for this developer, with each alternative having a name and one sentence description

    Important guidelines for the verdict:
    - "proceed" only if the project is clearly feasible given the developer's skills, experience, and time
    - "modify" if the project is good but needs to be scoped down, simplified, or adjusted to be feasible
    - "drop" ONLY if the project is clearly beyond the developer's current abilities AND time constraints AND cannot be reasonably simplified. This should be rare.
    - If verdict is "drop", you MUST include 2-3 alternative project ideas in a field called "alternatives" — each with a name and one sentence description — that are more suitable for this developer
        
    Example format:
    {{
        "summary": "This project is well-suited for the developer and offers good learning opportunities.",
        "verdict": "proceed",
        "complexity_score": 7,
        "overall_feasibility": "high",
        "learning_value": "medium",
        "resume_impact": "high",
        "estimated_time": "2 weeks",
        "tasks": [
            {{
                "name": "Task 1",
                "estimated_time": "3 days",
                "difficulty": "medium"
            }},
        ],
        "skill_gaps": [
            {{
                "skill": "Skill A",
                "resources": ["Resource 1", "Resource 2"]
            }},
        ],
        "risk_flags": [
            {{
                "challenge": "Challenge 1",
                "severity": "high",
                "mitigation": "Mitigation 1"
            }},
        ],
        "recommendations": [
            "Recommendation 1",
            "Recommendation 2"
        ],
        "alternatives": []
    }}
    """
    
    response = model.generate_content(prompt)
    cleaned_response = response.text.strip().replace("```json", "").replace("```", "").strip()
    
    try:
        evaluation = json.loads(cleaned_response)
        return {"evaluation": evaluation}
    except json.JSONDecodeError:
        return {"error": "Failed to parse response from Gemini", "raw_response": response.text}