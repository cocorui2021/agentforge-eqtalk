# user_feedback.py
from supabase import create_client, Client
from pydantic import BaseModel
from datetime import datetime

# Supabase configuration
url = "https://xyzcompany.supabase.co"
key = "your-anon-key"
supabase: Client = create_client(url, key)

class FeedbackModel(BaseModel):
    user_id: str
    scene: str
    selected_text: str
    style: str
    score: int
    reason: str
    selected_at: datetime

# Function to save feedback
def save_feedback(feedback: FeedbackModel):
    response = supabase.table("user_feedback").insert(feedback.dict()).execute()
    return response.data

if __name__ == "__main__":
    # Example usage
    feedback = FeedbackModel(
        user_id="user_001",
        scene="你能不能别烦我？",
        selected_text="我闭嘴不打扰你啦",
        style="温柔风",
        score=5,
        reason="共情中退让",
        selected_at=datetime.utcnow()
    )
    save_feedback(feedback)
    print("Feedback saved successfully!")
