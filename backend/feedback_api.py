
from fastapi import FastAPI, Request
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from supabase import create_client
from datetime import datetime
import uuid

load_dotenv()

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class FeedbackData(BaseModel):
    user_id: str
    scene: str
    selected_text: str
    style: str
    score: float
    reason: str

@app.post("/api/feedback")
def submit_feedback(data: FeedbackData):
    feedback_id = str(uuid.uuid4())
    record = {
        "feedback_id": feedback_id,
        "user_id": data.user_id,
        "scene": data.scene,
        "selected_text": data.selected_text,
        "style": data.style,
        "score": data.score,
        "reason": data.reason,
        "selected_at": datetime.utcnow().isoformat()
    }
    try:
        supabase.table("user_feedback").insert(record).execute()
        return {"status": "success", "id": feedback_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}
