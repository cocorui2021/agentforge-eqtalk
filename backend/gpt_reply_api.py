import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

openai.api_key = "your-openai-api-key"

class RequestModel(BaseModel):
    scene: str
    style: str
    max_suggestions: int = 4

@app.post("/api/gpt-reply")
async def generate_replies(request: RequestModel):
    try:
        prompt = f"生成{request.max_suggestions}种风格的回复：{request.scene}，使用风格：{request.style}"
        response = openai.Completion.create(
            engine="gpt-4", 
            prompt=prompt, 
            max_tokens=150,
            n=request.max_suggestions
        )
        suggestions = [{"text": choice.text.strip(), "score": 5, "reason": "情感匹配较好"} for choice in response.choices]
        return {"suggestions": suggestions, "reason": "风格分析完成"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
