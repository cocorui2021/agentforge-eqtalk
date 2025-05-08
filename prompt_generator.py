import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

def generate_responses(user_input, style="温柔风", max_suggestions=3):
    prompt = (
        f"她对我说：“{user_input}”\n"
        f"你是一个情商很高、说话像朋友的AI，请用【{style}】语气，生成{max_suggestions}条简短高情商回应，"
        "每条25字以内，像微信聊天语气。不要说大道理。\n"
        "返回格式：\n"
        "1. 句子（推荐星级/理由）\n"
    )
    response = client.chat.completions.create(
        model=os.getenv("AZURE_DEPLOYMENT_NAME"),
        messages=[
            {"role": "system", "content": "你是一个口语自然、懂共情、表达清晰的情感沟通AI。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.6,
        max_tokens=200
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    user_text = "你能不能别烦我？"
    style = "温柔风"
    print("🧠 用户输入：", user_text)
    print("🎯 GPT生成回应：\n")
    print(generate_responses(user_text, style))
