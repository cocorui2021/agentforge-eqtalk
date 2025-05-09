@app.post("/api/gpt-reply")
async def generate_replies(request: RequestModel):
    try:
        prompt = f"""
你是一个高情商对话助手，请基于以下用户对话场景：
{request.scene}
生成 {request.max_suggestions} 条回复，每条应符合不同的情感语气（如温柔、幽默、冷静、直接等），并为每条回复赋予：
- 推荐等级（1-5分）
- 推荐理由（简短）
请用 JSON 格式返回列表，例如：
[{{"text": "xxx", "score": 5, "reason": "语气柔和，能有效共情"}}]
        """.strip()

        completion = openai.ChatCompletion.create(
            deployment_id="gpt-4.1",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        content = completion['choices'][0]['message']['content']
        suggestions = eval(content) if content.startswith("[") else [{"text": content, "score": 3, "reason": "默认回复"}]

        return {"suggestions": suggestions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
