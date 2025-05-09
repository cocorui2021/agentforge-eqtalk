@app.post("/api/gpt-reply")
async def generate_replies(request: RequestModel):
    try:
        base_system = {
            "role": "system",
            "content": "你是一位精通沟通技巧与情绪调节的对话专家，请根据用户提供的对话上下文，生成合适的情绪化回复建议，帮助用户达成更好的沟通效果。"
        }

        user_prompt = f"""
这是当前对话场景：
{request.scene}

请基于以上上下文，生成不超过4条回复建议，每条带上：
- 回复文本
- 推荐分数（1~5）
- 推荐理由（情绪适配性、共情度、风格清晰度等）
JSON格式输出即可：
[{{"text": "...", "score": 5, "reason": "..."}}]
        """.strip()

        completion = openai.ChatCompletion.create(
            deployment_id="gpt-4.1",
            messages=[base_system, {"role": "user", "content": user_prompt}],
            temperature=0.7
        )

        content = completion['choices'][0]['message']['content']
        suggestions = eval(content) if content.startswith("[") else [{"text": content, "score": 3, "reason": "默认回复"}]

        return {"suggestions": suggestions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
