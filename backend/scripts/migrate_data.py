import asyncio
import sqlite3
import os
import json
import uuid
import asyncpg
from datetime import datetime
from dotenv import load_dotenv

# Load production env
load_dotenv()
# Convert sqlalchemy URL to asyncpg URL (remove the +asyncpg)
DATABASE_URL = os.getenv("DATABASE_URL").replace("postgresql+asyncpg://", "postgresql://")
SQLITE_PATH = "taskora.db"

def parse_dt(dt_str):
    if not dt_str: return None
    if isinstance(dt_str, datetime): return dt_str
    try:
        return datetime.fromisoformat(dt_str.replace('Z', '+00:00'))
    except:
        try:
            return datetime.strptime(dt_str.split('.')[0], "%Y-%m-%d %H:%M:%S")
        except:
            return dt_str

def parse_date(d_str):
    if not d_str: return None
    try:
        if isinstance(d_str, str):
            return datetime.strptime(d_str, "%Y-%m-%d").date()
    except: pass
    return d_str

def to_uuid(id_str):
    if not id_str: return None
    if isinstance(id_str, uuid.UUID): return id_str
    try: return uuid.UUID(id_str)
    except: return id_str

async def migrate():
    print(f"Starting legacy sync from {SQLITE_PATH} to Supabase...")
    
    if not DATABASE_URL:
        print("Error: DATABASE_URL not found in .env")
        return

    # 1. Read SQLite
    print(f"Reading local data from {SQLITE_PATH}...")
    try:
        sqlite_conn = sqlite3.connect(SQLITE_PATH)
        sqlite_conn.row_factory = sqlite3.Row
        sql_cursor = sqlite_conn.cursor()
        sql_cursor.execute("SELECT * FROM users")
        users = [dict(row) for row in sql_cursor.fetchall()]
        sql_cursor.execute("SELECT * FROM tasks")
        tasks = [dict(row) for row in sql_cursor.fetchall()]
        sqlite_conn.close()
        print(f"Found {len(users)} users and {len(tasks)} tasks.")
    except Exception as e:
        print(f"SQLite Error: {e}")
        return

    # 2. Connect to Supabase (Postgres)
    print("Connecting to Supabase (Direct Connection)...")
    
    conn = None
    try:
        # Use raw asyncpg connection with unique statement names for PgBouncer compatibility
        conn = await asyncpg.connect(
            DATABASE_URL,
            ssl='require',
            statement_cache_size=0,
            prepared_statement_name_func=lambda: f"__asyncpg_{uuid.uuid4()}__"
        )
        print("Connection Established.")

        # Migrate Users
        print("Syncing Users...")
        for user in users:
            try:
                await conn.execute("""
                    INSERT INTO users (id, email, full_name, hashed_password, created_at, is_active)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT (email) DO NOTHING
                """, 
                to_uuid(user['id']), 
                user['email'], 
                user['full_name'], 
                user['hashed_password'], 
                parse_dt(user['created_at']), 
                bool(user['is_active']))
            except Exception as e:
                print(f"Skipping user {user['email']}: {e}")

        # Migrate Tasks
        print("Syncing Tasks...")
        task_count = 0
        for task in tasks:
            try:
                # Lowercase enums for Postgres compatibility
                priority = task['priority'].lower() if task['priority'] else 'medium'
                status = task['status'].lower() if task['status'] else 'todo'
                
                # Prepare JSON
                tm = task['team_members']
                if isinstance(tm, str): tm = json.loads(tm)
                st = task['sub_tasks']
                if isinstance(st, str): st = json.loads(st)

                await conn.execute("""
                    INSERT INTO tasks (
                        id, title, description, project_category, priority, status, 
                        due_date, start_time, end_time, progress, team_members, 
                        accent_color, link, stats_budget, stats_people, stats_comments, 
                        sub_tasks, created_at, updated_at, completed_at, user_id
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
                    ON CONFLICT (id) DO NOTHING
                """, 
                to_uuid(task['id']), 
                task['title'], 
                task['description'], 
                task['project_category'], 
                priority, 
                status, 
                parse_date(task['due_date']), 
                parse_dt(task['start_time']), 
                parse_dt(task['end_time']), 
                task['progress'], 
                json.dumps(tm) if tm else None, 
                task['accent_color'], 
                task['link'], 
                task['stats_budget'], 
                task['stats_people'], 
                task['stats_comments'], 
                json.dumps(st) if st else None, 
                parse_dt(task['created_at']), 
                parse_dt(task['updated_at']), 
                parse_dt(task['completed_at']), 
                to_uuid(task['user_id']))
                task_count += 1
            except Exception as e:
                print(f"Skipping task '{task['title']}': {e}")
        
        print(f"SYNC COMPLETE: {len(users)} users and {task_count} tasks are now cloud-hosted.")
        
    except Exception as e:
        print(f"Migration failed: {e}")
    finally:
        if conn:
            await conn.close()

if __name__ == "__main__":
    asyncio.run(migrate())
