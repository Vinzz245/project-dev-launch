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