from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ResponseModel(BaseModel):
    text: str
    style: str
    score: int
    reason: str

@app.get("/api/display-replies")
async def get_replies() -> List[ResponseModel]:
    try:
        # 模拟从数据库获取风格化回复
        replies = [
            {"text": "你说的对，我们可以尝试更好地沟通。", "style": "温柔风", "score": 5, "reason": "共情"},
            {"text": "哦，可能我太忙了，没注意到你的需求", "style": "幽默风", "score": 4, "reason": "幽默"},
            {"text": "我理解，下一次我们可以避免这些误会", "style": "冷静风", "score": 5, "reason": "冷静分析"},
            {"text": "没错，我们可以改进沟通方式", "style": "直接风", "score": 4, "reason": "直率"}
        ]
        return replies
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
