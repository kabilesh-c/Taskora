"""Seed script — creates demo user and 15 sample tasks for Weboin Technologies."""

import asyncio
import sys
import uuid
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

# Add parent directory to path so we can import the app package
sys.path.insert(0, str(Path(__file__).parent))

from app.core.security import hash_password
from app.db.database import async_session_factory, engine
from app.db.models import Base, Task, TaskPriority, TaskStatus, User
from sqlalchemy import select


DEMO_EMAIL = "demo@weboin.com"
DEMO_PASSWORD = "demo1234"
DEMO_FULL_NAME = "Demo User"

today = date.today()

# We will calculate dates relative to "this week's monday"
def get_this_monday():
    d = datetime.now(timezone.utc)
    # 0 = Monday
    monday = d - timedelta(days=d.weekday())
    # Set to precise Midnight UTC to avoid random times
    return monday.replace(hour=0, minute=0, second=0, microsecond=0)

monday = get_this_monday()

SAMPLE_TASKS = [
    # ---- CALENDAR TASKS ----
    {
        "title": "Calling Customer", "description": "", "project_category": "Marketing",
        "priority": TaskPriority.MEDIUM, "status": TaskStatus.IN_PROGRESS,
        "due_date": monday.date(), # Monday
        "start_time": monday.replace(hour=8, minute=0), "end_time": monday.replace(hour=9, minute=30),
        "progress": 0, "team_members": ["Arjun", "Priya"], "accent_color": "#FFD666"
    },
    {
        "title": "Design Review", "description": "", "project_category": "Design",
        "priority": TaskPriority.MEDIUM, "status": TaskStatus.IN_PROGRESS,
        "due_date": monday.date(), # Monday
        "start_time": monday.replace(hour=10, minute=0), "end_time": monday.replace(hour=11, minute=0),
        "progress": 0, "team_members": ["Kavi", "Ravi"], "accent_color": "#69B1FF"
    },
    {
        "title": "Design Meet", "description": "", "project_category": "Design",
        "priority": TaskPriority.HIGH, "status": TaskStatus.TODO,
        "due_date": monday.replace(day=monday.day + 1).date(), # Tuesday
        "start_time": monday.replace(day=monday.day + 1, hour=10, minute=0), "end_time": monday.replace(day=monday.day + 1, hour=11, minute=0),
        "progress": 0, "team_members": ["Kavi", "Ravi", "Priya"], "accent_color": "#B37FEB"
    },
    {
        "title": "Sprint Review", "description": "", "project_category": "Management",
        "priority": TaskPriority.HIGH, "status": TaskStatus.COMPLETED,
        "due_date": monday.replace(day=monday.day + 2).date(), # Wednesday
        "start_time": monday.replace(day=monday.day + 2, hour=9, minute=0), "end_time": monday.replace(day=monday.day + 2, hour=10, minute=30),
        "progress": 100, "team_members": ["Jane", "Tom", "Amy"], "accent_color": "#FF85C0",
        "sub_tasks": ["Meeting", "UI/UX Design", "Prototypes", "Design System"]
    },
    {
        "title": "1st Review", "description": "", "project_category": "Development",
        "priority": TaskPriority.MEDIUM, "status": TaskStatus.IN_PROGRESS,
        "due_date": monday.replace(day=monday.day + 3).date(), # Thursday
        "start_time": monday.replace(day=monday.day + 3, hour=10, minute=0), "end_time": monday.replace(day=monday.day + 3, hour=11, minute=0),
        "progress": 50, "team_members": ["Nisha"], "accent_color": "#69B1FF"
    },
    {
        "title": "Archive Review", "description": "", "project_category": "Management",
        "priority": TaskPriority.LOW, "status": TaskStatus.COMPLETED,
        "due_date": monday.replace(day=monday.day + 4).date(), # Friday
        "start_time": monday.replace(day=monday.day + 4, hour=13, minute=0), "end_time": monday.replace(day=monday.day + 4, hour=14, minute=0),
        "progress": 100, "team_members": ["Raj"], "accent_color": "#9CA3AF"
    },

    # ---- URGENT / RIGHT PANEL TASKS ----
    {
        "title": "Design System", "description": "Update and document component library.", "project_category": "Design",
        "priority": TaskPriority.URGENT, "status": TaskStatus.IN_PROGRESS,
        "due_date": monday.date(),
        "start_time": monday.replace(hour=9, minute=0), "end_time": monday.replace(hour=13, minute=0),
        "progress": 67, "team_members": ["Kavi", "Raj", "Amy"], "accent_color": "#FF8A8A",
    },
    {
        "title": "Designers Meeting", "description": "A weekly call with the team's designers. We'll discuss problems and solutions.", "project_category": "Design",
        "priority": TaskPriority.URGENT, "status": TaskStatus.IN_PROGRESS,
        "due_date": monday.date(),
        "start_time": monday.replace(hour=14, minute=30), "end_time": monday.replace(hour=15, minute=10),
        "progress": 62, "team_members": ["Priya", "Tom", "Amy"], "accent_color": "#D4B4FF",
        "link": "meet.google.com/mzh-abcd"
    },
    {
        "title": "Make Report", "description": "Compile analytics, ad spend, and lead gen numbers for Q2.", "project_category": "Marketing",
        "priority": TaskPriority.URGENT, "status": TaskStatus.TODO,
        "due_date": monday.date(),
        "start_time": monday.replace(hour=17, minute=0), "end_time": monday.replace(hour=18, minute=0),
        "progress": 45, "team_members": ["Jason"], "accent_color": "#98F5E1",
        "stats_budget": "₹5.39L / ₹20.9L", "stats_people": 19, "stats_comments": 81
    },
    {
        "title": "Load Planning", "description": "Allocate developer and designer bandwidth for deliverables.", "project_category": "Development",
        "priority": TaskPriority.URGENT, "status": TaskStatus.IN_PROGRESS,
        "due_date": monday.date(),
        "start_time": monday.replace(hour=18, minute=20), "end_time": monday.replace(hour=19, minute=10),
        "progress": 30, "team_members": ["Arjun", "Nisha"], "accent_color": "#A7F3D0"
    },
]


async def seed() -> None:
    """Create demo user and sample tasks."""
    print("Dropping existing tables to reset schema...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("Tables created.")

    async with async_session_factory() as session:
        user_id = uuid.uuid4()
        demo_user = User(
            id=user_id,
            email=DEMO_EMAIL,
            full_name=DEMO_FULL_NAME,
            hashed_password=hash_password(DEMO_PASSWORD),
        )
        session.add(demo_user)
        
        now = datetime.now(timezone.utc)
        for i, task_data in enumerate(SAMPLE_TASKS):
            completed_at = now if task_data["status"] == TaskStatus.COMPLETED else None
            task = Task(
                id=uuid.uuid4(),
                title=task_data["title"],
                description=task_data.get("description"),
                project_category=task_data.get("project_category"),
                priority=task_data["priority"],
                status=task_data["status"],
                due_date=task_data["due_date"],
                start_time=task_data.get("start_time"),
                end_time=task_data.get("end_time"),
                progress=task_data.get("progress", 0),
                team_members=task_data.get("team_members"),
                accent_color=task_data.get("accent_color"),
                link=task_data.get("link"),
                stats_budget=task_data.get("stats_budget"),
                stats_people=task_data.get("stats_people"),
                stats_comments=task_data.get("stats_comments"),
                sub_tasks=task_data.get("sub_tasks"),
                completed_at=completed_at,
                user_id=user_id,
                created_at=now - timedelta(hours=len(SAMPLE_TASKS) - i),
                updated_at=now,
            )
            session.add(task)

        await session.commit()
        print(f"Seed completed successfully. Inserted {len(SAMPLE_TASKS)} mock items perfectly matching UI reference.")

if __name__ == "__main__":
    asyncio.run(seed())
