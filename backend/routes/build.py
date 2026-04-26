from fastapi import APIRouter
from models.schemas import buildRequest
import google.generativeai as genai
import json
import os

router = APIRouter()\

@router.post("/build")
def build_project(req: buildRequest):
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
    prompt = f"""
    You are an expert project builder who provides clear and actionable guidance to help developers successfully execute their projects.
    Your job is to help them get unstuck with clear, actionable advice that they can follow to move their project forward. 
    You do not write code for them, but you help them make decisions, understand how to approach problems, and provide resources and strategies for overcoming challenges.
    Given the following project idea, current progress, and the profile of a developer, provide a detailed plan for how the developer can go ahead with this project. The plan should include specific steps, resources, and recommendations for how to approach each phase of the project.

    Project Idea: {req.project_idea}
    What has been done so far: {req.current_progress}
    What the developer is currently stuck on: {req.current_blockers}
    Skills: {req.skills}
    Experience level: {req.experience}
    Time remaining: {req.time_remaining}

    Return ONLY the project plan in a JSON format. Do not include any explanations or additional text. The project plan should include the following fields:
    - diagnosis: A brief analysis of the current state of the project, including what has been done well, what could be improved, and the main reasons for the current blockers
    - is_blocker_critical: true/false - An assessment of whether the current blockers are critical issues that must be resolved before any further progress can be made, or if they are challenges that can be worked around or addressed in parallel with other tasks
    - next_steps: A list of specific, actionable steps the developer can take to move the project forward, with each step having a clear action to take, why the step helps and estimated time for it
    - decisions_to_make: A list of key decisions the developer needs to make in order to move forward, along with the pros and cons of each option and a recommendation for which option to choose
    - resources: A list of specific resources (e.g., tutorials, documentation, tools, communities) that would be helpful for the developer to consult in order to overcome their current blockers and successfully execute the next steps of the project giving the user a title, a link for each resource and why it's relevant
    - time_check: An assessment of whether the developer's remaining time is sufficient to complete the project given the current state and the recommended next steps, along with suggestions for how to adjust the plan if time is insufficient
    - motivation_boost: A brief, encouraging message to help boost the developer's motivation and confidence in their ability to overcome the current challenges and successfully complete the project

    Example format:
    {{
        "diagnosis": "The developer has made good progress on setting up the project and has a clear vision, but they are currently stuck on implementing a critical feature that is essential for the project's core functionality.",
        "is_blocker_critical": true,
        "next_steps": [
            {{
                "action": "Break down the critical feature into smaller, more manageable tasks",
                "why": "This will make it easier to identify specific issues and make incremental progress",
                "estimated_time": "2 days"
            }},
            {{
                "action": "Consult resource X to understand how to implement this feature",
                "why": "This resource provides a clear tutorial on how to implement the exact functionality needed",
                "estimated_time": "1 day"
            }}
        ],
        "decisions_to_make": [
            {{
                "decision": "Whether to use library A or library B for implementing the critical feature",
                "options": [
                    {{
                        "option": "Library A",
                        "pros": ["Easier to use", "Better documentation"],
                        "cons": ["Less flexible", "May not scale well"]
                    }},
                    {{
                        "option": "Library B",
                        "pros": ["More powerful", "Better performance"],
                        "cons": ["Steeper learning curve", "Less beginner-friendly"]
                    }}
                ],
                "recommendation": "Given the developer's experience level and time constraints, I recommend using Library A for this project."
            }}
        ],
        "resources": [
            {{
                "title": "Tutorial on implementing critical feature",
                "link": "https://example.com/tutorial",
                "relevance": "This tutorial provides a step-by-step guide on how to implement the critical feature that the developer is currently stuck on."
            }},
        ],
        "time_check": {{
            "is_time_sufficient": true,
            "suggestions_if_insufficient": []
        }},
        "motivation_boost": "You're doing great! Remember that every developer faces blockers, but with persistence and the right strategies, you can overcome them and successfully complete your project. Keep pushing forward!"
    }}
    """
    
    response = model.generate_content(prompt)
    
    cleaned_response = response.text.strip().replace("```json", "").replace("```", "").strip()
    
    try:
        project_plan = json.loads(cleaned_response)
        return {"project_plan": project_plan}
    except json.JSONDecodeError:
        return {"error": "Failed to parse project plan"}