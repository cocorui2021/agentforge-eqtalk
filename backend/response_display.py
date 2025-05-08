def format_responses(response_list):
    output = []
    for idx, item in enumerate(response_list, 1):
        sentence = item.get("text", "")
        reason = item.get("reason", "")
        score = item.get("score", 5)
        stars = "⭐️" * int(round(score))
        output.append(f"{idx}. {sentence}   [{stars}]")
        output.append(f"   ⮩ 理由：{reason}\n")
    return "\n".join(output)


# 示例数据
if __name__ == "__main__":
    example_responses = [
        {
            "text": "好啦我闭嘴啦~",
            "reason": "用幽默弱化冲突，亲昵口吻缓和关系",
            "score": 5
        },
        {
            "text": "不烦你了，我溜咯…",
            "reason": "退一步表达尊重，营造轻松氛围",
            "score": 4.5
        },
        {
            "text": "我是不是太黏你了？",
            "reason": "自我反省姿态，易引发对方共鸣",
            "score": 4
        }
    ]

    print("🧠 AI为你推荐3条回应：\n")
    print(format_responses(example_responses))