import asyncio
import os
import json
import uuid
import asyncpg
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL").replace("postgresql+asyncpg://", "postgresql://")

async def check():
    print(f"Connecting to {DATABASE_URL[:50]}...")
    conn = await asyncpg.connect(DATABASE_URL, ssl='require', statement_cache_size=0)
    
    users = await conn.fetch("SELECT id, email, full_name FROM users")
    tasks = await conn.fetch("SELECT id, title, due_date, user_id, status FROM tasks")
    
    await conn.close()
    
    result = {
        "users": [dict(u) for u in users],
        "tasks_count": len(tasks),
        "sample_tasks": [{"title": t['title'], "due_date": str(t['due_date']), "user_id": str(t['user_id']), "status": t['status']} for t in tasks[:5]]
    }
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(check())
