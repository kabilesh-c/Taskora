import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.db.database import engine
from app.db.models import Base

async def init_db():
    print("Connecting to Supabase to initialize schema...")
    try:
        async with engine.begin() as conn:
            # Create tables if they don't exist
            await conn.run_sync(Base.metadata.create_all)
        print("Supabase schema initialized successfully.")
    except Exception as e:
        print(f"Initialization failed: {e}")

if __name__ == "__main__":
    asyncio.run(init_db())
