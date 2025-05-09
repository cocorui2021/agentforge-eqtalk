from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import openai

router = APIRouter()

with open("roles.json", "r", encoding="utf-8") as f:
    role_data = {r["id"]: r for r in json.load(f)}

class RoleRequest(BaseModel):
    role_id: str
    user_input: str

@router.post("/api/role-reply")
async def role_reply(req: RoleRequest):
    if req.role_id not in role_data:
        raise HTTPException(status_code=404, detail="角色不存在")
    
    role = role_data[req.role_id]
    prompt = f"""{role['style_prompt']}
现在你要回应用户这句话：
"{req.user_input}"
请以该角色身份回复一句合适的文本。
"""
    try:
        completion = openai.ChatCompletion.create(
            deployment_id="gpt-4.1",
            messages=[{"role": "system", "content": prompt}],
            temperature=0.8
        )
        reply = completion['choices'][0]['message']['content'].strip()
        return {"reply": reply, "role": role["name"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成失败：{e}")
