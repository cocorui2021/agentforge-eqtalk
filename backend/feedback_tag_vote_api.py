from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client

router = APIRouter()

# 替换成你的实际 Supabase 信息
supabase_url = "your-supabase-url"
supabase_key = "your-supabase-key"
supabase = create_client(supabase_url, supabase_key)

class TagVote(BaseModel):
    tag_name: str

@router.post("/api/feedback-tag-vote")
async def tag_vote(vote: TagVote):
    try:
        supabase.table("tag_feedback").insert({
            "tag_name": vote.tag_name
        }).execute()
        return {"message": "投票成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"投票记录失败：{e}")
