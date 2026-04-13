from supabase import create_client
from flask import current_app

def get_supabase():
    url = current_app.config["SUPABASE_URL"]
    key = current_app.config["SUPABASE_SERVICE_KEY"]
    print(f"Creating supabase client | URL: {url} | Key starts with: {key[:15] if key else None}")
    return create_client(url, key)