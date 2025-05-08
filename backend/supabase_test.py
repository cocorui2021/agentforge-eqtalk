import supabase

# 初始化 supabase 客户端
url = "your-supabase-url"
key = "your-supabase-key"
supabase = supabase.create_client(url, key)

# 测试数据插入
def insert_feedback(user_id, scene, selected_text, style, score, reason):
    try:
        response = supabase.table("user_feedback").insert([
            {"user_id": user_id, "scene": scene, "selected_text": selected_text, "style": style, "score": score, "reason": reason}
        ]).execute()
        return response
    except Exception as e:
        print(f"Error inserting feedback: {e}")
        return None
