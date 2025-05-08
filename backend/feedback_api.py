from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client

# 初始化 supabase 客户端
url = "your-supabase-url"
key = "your-supabase-key"
supabase = create_client(url, key)

app = FastAPI()

class FeedbackModel(BaseModel):
    user_id: str
    scene: str
    selected_text: str
    style: str
    score: int
    reason: str

@app.post("/api/feedback")
async def submit_feedback(feedback: FeedbackModel):
    try:
        # 保存用户反馈到数据库
        response = supabase.table("user_feedback").insert({
            "user_id": feedback.user_id,
            "scene": feedback.scene,
            "selected_text": feedback.selected_text,
            "style": feedback.style,
            "score": feedback.score,
            "reason": feedback.reason
        }).execute()
        return {"message": "反馈已保存"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
