from fastapi import APIRouter
from models.schemas import chatRequest
import google.generativeai as genai
import json
import os

router = APIRouter()

@router.post("/chat")
def chat(req: chatRequest):
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
    recent_messages = req.messages[-10:]

    system_context = f"""
    You are an expert project advisor and evaluator who provides honest and constructive feedback to help developers succeed in their projects.
    
    Here is the conetext of what was already evaluated about the project idea:
    Project Idea: {req.project_idea}
    Skills: {req.skills}
    Experience level: {req.experience}
    Time Available: {req.time_available}
    Original evaluation summary: {req.evaluation_summary}

    Answer the developer's follow-up questions honestly and constructively, providing actionable advice and insights to help them make informed decisions about their project. Be direct and clear in your responses, while also being supportive and encouraging.
    Be concise, direct and actionable too.
    If the developer wants to modify the project, provide specific suggestions for how they can adjust the project scope, requirements, or approach to make it more feasible and better aligned with their profile.
    If they ask for re-evaluation, provide an updated evaluation based on the new information or changes they are considering, and be clear about whether you think the project is now more or less feasible, and why.
    """

    history = []
    for msg in recent_messages[:-1]:
        history.append({
            "role": msg.role, 
            "parts": [msg.content]
        })

    chat_session = model.start_chat(history=history)
    last_message = recent_messages[-1].content

    if len(history) == 0:
        last_message = f"{system_context}\n\nDeveloper's question: {last_message}"

    response = chat_session.send_message(last_message)

    return {
        "response": response.text, 
        "role": "assistant"
    }