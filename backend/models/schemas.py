from pydantic import BaseModel

class suggestRequest(BaseModel):
    skills: str
    interests: str
    experience: str
    time_available: str

class evaluateRequest(BaseModel):
    project_idea: str
    skills: str
    experience: str
    time_available: str

class message(BaseModel):
    role: str
    content: str

class chatRequest(BaseModel):
    project_idea: str
    skills: str
    experience: str
    time_available: str
    evaluation_summary: str
    messages: list[message]

class buildRequest(BaseModel):
    project_idea: str
    current_progress: str
    current_blockers: str
    skills: str
    experience: str
    time_remaining: str