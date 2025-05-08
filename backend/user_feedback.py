import json
import uuid
from datetime import datetime

def record_user_feedback(user_id, scene_text, selected_index, response_list):
    feedback_id = str(uuid.uuid4())
    selected = response_list[selected_index - 1]
    record = {
        "feedback_id": feedback_id,
        "user_id": user_id,
        "scene": scene_text,
        "selected_text": selected.get("text"),
        "style": selected.get("style", "温柔风"),
        "score": selected.get("score", 5),
        "reason": selected.get("reason", ""),
        "selected_at": datetime.utcnow().isoformat()
    }
    # 可写入数据库 / 本地保存
    with open("user_feedback.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")
    return record


# 示例交互
if __name__ == "__main__":
    sample_user = "user_001"
    scene = "你能不能别烦我？"
    response_list = [
        {"text": "好啦我闭嘴啦~", "reason": "幽默弱化冲突", "score": 5, "style": "温柔风"},
        {"text": "不烦你了，我溜咯…", "reason": "表达尊重", "score": 4.5, "style": "温柔风"},
        {"text": "我是不是太黏你了？", "reason": "自我反省", "score": 4, "style": "温柔风"}
    ]

    # 模拟选择第2条
    feedback = record_user_feedback(sample_user, scene, 2, response_list)
    print("✅ 已记录用户反馈：")
    print(json.dumps(feedback, indent=2, ensure_ascii=False))