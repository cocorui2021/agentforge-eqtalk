
from fastapi import FastAPI, Request
from pydantic import BaseModel
import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

class ChatInput(BaseModel):
    scene: str
    style: str = "温柔风"
    max_suggestions: int = 3

@app.post("/api/gpt-reply")
def suggest_replies(input: ChatInput):
    prompt = f"""
以下是用户上传的聊天内容：

{input.scene}

请你基于这些对话，判断当前的情绪张力与沟通状态，生成{input.max_suggestions}条“自然、人说话风格”的高情商回应建议。
每条控制在25字以内，像聊天中的话，不要讲道理。
格式如下：
1. 回复内容（⭐⭐⭐⭐⭐ / 推荐理由）
"""
    response = client.chat.completions.create(
        model=os.getenv("AZURE_DEPLOYMENT_NAME"),
        messages=[
            {"role": "system", "content": "你是一个情商很高的聊天AI，说话自然接地气，不要用书面语或总结性语言。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.6,
        max_tokens=300
    )
    return {"results": response.choices[0].message.content}
