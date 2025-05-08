import os
from dotenv import load_dotenv
from supabase import create_client
from datetime import datetime
import uuid

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def insert_feedback(user_id, scene, selected_text, style="温柔风", score=5, reason=""):
    feedback_id = str(uuid.uuid4())
    record = {
        "feedback_id": feedback_id,
        "user_id": user_id,
        "scene": scene,
        "selected_text": selected_text,
        "style": style,
        "score": score,
        "reason": reason,
        "selected_at": datetime.utcnow().isoformat()
    }
    response = supabase.table("user_feedback").insert(record).execute()
    return response

def fetch_feedback(user_id):
    response = supabase.table("user_feedback").select("*").eq("user_id", user_id).order("selected_at", desc=True).limit(5).execute()
    return response.data

if __name__ == "__main__":
    print("📤 插入反馈测试...")
    insert_feedback("user_001", "你能不能别烦我？", "我闭嘴不打扰你啦", style="温柔风", score=5, reason="共情中退让")
    print("📥 最近记录查询...")
    records = fetch_feedback("user_001")
    for r in records:
        print(r)