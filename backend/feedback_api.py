from supabase import create_client

# 创建反馈存储功能
def save_feedback(user_id, scene, selected_text, style, score, reason):
    try:
        response = supabase.table("user_feedback").insert({
            "user_id": user_id,
            "scene": scene,
            "selected_text": selected_text,
            "style": style,
            "score": score,
            "reason": reason
        }).execute()
        return response
    except Exception as e:
        print(f"Error saving feedback: {e}")
        return None
