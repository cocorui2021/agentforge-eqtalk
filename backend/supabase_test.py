# supabase_test.py
from supabase import create_client, Client

# Replace with your Supabase project URL and key
url = "https://xyzcompany.supabase.co"
key = "your-anon-key"
supabase: Client = create_client(url, key)

# Test query to ensure connection
def test_supabase():
    response = supabase.table("user_feedback").select("*").execute()
    print(response.data)

if __name__ == "__main__":
    test_supabase()
