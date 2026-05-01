# project-dev-launch

An AI-powered developer project companion that helps you go from idea to execution.

## What it does

**Discover** — Don't know what to build? Enter your skills, interests, experience level, and time available. Get 3 tailored project ideas with resume impact, learning value, and uniqueness scores.

**Evaluate** — Have a project idea? Get a full breakdown — task list, time estimates, skill gaps, risk flags, complexity score, and an honest verdict on whether to proceed, modify, or drop it.

**Build** — Stuck mid-project? Describe your blocker and get actionable next steps, key decisions to make, and relevant resources to get unstuck.

## Tech Stack

**Backend**
- Python, FastAPI, Pydantic
- Google Gemini API
- Uvicorn

**Frontend**
- React, Vite
- Tailwind CSS
- Axios, React Markdown

## Project Structure

```
project-dev-launch/
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── suggest.py
│   │   ├── evaluate.py
│   │   ├── chat.py
│   │   └── build.py
│   ├── models/
│   │   └── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── Evaluate.jsx
│   │   │   └── Build.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## Getting Started

**Backend**
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:
```
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.0-flash
```

Run the backend:
```bash
python -m uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/suggest` | Get project idea suggestions |
| POST | `/evaluate` | Evaluate a project idea |
| POST | `/chat` | Chat about an evaluation |
| POST | `/build` | Get help when stuck mid-project |

## Author

Busam Naga Sai Vinay — NIT Warangal