from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client

router = APIRouter()

supabase_url = "your-supabase-url"
supabase_key = "your-supabase-key"
supabase = create_client(supabase_url, supabase_key)

class HistoryQuery(BaseModel):
    user_id: str

@router.post("/api/history")
async def get_user_history(query: HistoryQuery):
    try:
        data = supabase.table("user_feedback").select("*").eq("user_id", query.user_id).order("selected_at", desc=True).limit(50).execute()
        return {"history": data.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取历史失败：{e}")
