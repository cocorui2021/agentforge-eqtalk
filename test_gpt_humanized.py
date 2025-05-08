import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

response = client.chat.completions.create(
    model=os.getenv("AZURE_DEPLOYMENT_NAME"),  # 推荐使用 gpt-4.1 或 gpt-4o
    messages=[
        {
            "role": "system",
            "content": (
                "你是一个善于聊天、能理解人心的AI，说话像真实人类，像好朋友一样讲话，不要说大道理，不写长段落。"
                "风格必须温柔、自然、带点情绪共鸣，回应不能超过25字。"
            )
        },
        {
            "role": "user",
            "content": (
                "她说我很烦，我该怎么回应？\n"
                "请你输出3句温柔风格的简短人类式回应。"
            )
        }
    ],
    temperature=0.6,
    max_tokens=80
)

print("🗨️ GPT生成回应：")
print(response.choices[0].message.content.strip())
