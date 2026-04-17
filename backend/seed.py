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

SAMPLE_TASKS = [
    {
        "title": "SEO Audit — TechCorp Client",
        "description": "Complete comprehensive SEO audit including technical SEO, on-page, and backlink analysis for TechCorp.",
        "priority": TaskPriority.HIGH,
        "status": TaskStatus.IN_PROGRESS,
        "due_date": today + timedelta(days=3),
    },
    {
        "title": "Google Ads Campaign Q2 Setup",
        "description": "Set up Q2 Google Ads campaigns including keyword research, ad copy, and budget allocation.",
        "priority": TaskPriority.URGENT,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=1),
    },
    {
        "title": "Landing Page Redesign — StartupX",
        "description": "Redesign the landing page for StartupX with new brand guidelines and conversion optimization.",
        "priority": TaskPriority.HIGH,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=5),
    },
    {
        "title": "Meta Ads Creative Review",
        "description": "Review and approve creative assets for Meta advertising campaigns across Facebook and Instagram.",
        "priority": TaskPriority.MEDIUM,
        "status": TaskStatus.COMPLETED,
        "due_date": None,
    },
    {
        "title": "Instagram Content Calendar — April",
        "description": "Plan and schedule Instagram content for April including posts, reels, and stories.",
        "priority": TaskPriority.MEDIUM,
        "status": TaskStatus.COMPLETED,
        "due_date": None,
    },
    {
        "title": "Client Onboarding — HealthBridge",
        "description": "Complete onboarding process for new client HealthBridge including discovery call and strategy document.",
        "priority": TaskPriority.HIGH,
        "status": TaskStatus.IN_PROGRESS,
        "due_date": today + timedelta(days=2),
    },
    {
        "title": "Website Performance Audit",
        "description": "Run Lighthouse audits and identify performance bottlenecks across client websites.",
        "priority": TaskPriority.LOW,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=10),
    },
    {
        "title": "Keyword Research — FoodDelivery App",
        "description": "Conduct keyword research for the FoodDelivery app launch campaign targeting Chennai market.",
        "priority": TaskPriority.MEDIUM,
        "status": TaskStatus.IN_PROGRESS,
        "due_date": None,
    },
    {
        "title": "Mobile App UI Wireframes",
        "description": "Create wireframes for the mobile app project including user flows and interaction patterns.",
        "priority": TaskPriority.HIGH,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=7),
    },
    {
        "title": "Monthly Report — ABC Corp",
        "description": "Prepare monthly analytics and performance report for ABC Corp covering all active campaigns.",
        "priority": TaskPriority.URGENT,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=1),
    },
    {
        "title": "LinkedIn Ad Campaign Review",
        "description": "Analyse LinkedIn ad campaign performance and prepare optimization recommendations.",
        "priority": TaskPriority.MEDIUM,
        "status": TaskStatus.COMPLETED,
        "due_date": None,
    },
    {
        "title": "E-commerce CMS Migration",
        "description": "Migrate e-commerce client from legacy CMS to modern headless architecture.",
        "priority": TaskPriority.HIGH,
        "status": TaskStatus.IN_PROGRESS,
        "due_date": today + timedelta(days=4),
    },
    {
        "title": "Brand Identity — NewTech Startup",
        "description": "Develop complete brand identity package including logo, colour palette, and brand guidelines.",
        "priority": TaskPriority.MEDIUM,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=14),
    },
    {
        "title": "Lead Gen Funnel Audit",
        "description": "Audit existing lead generation funnels and identify conversion rate improvement opportunities.",
        "priority": TaskPriority.LOW,
        "status": TaskStatus.COMPLETED,
        "due_date": None,
    },
    {
        "title": "YouTube Channel SEO Optimisation",
        "description": "Optimise YouTube channel SEO including titles, descriptions, tags, and thumbnails.",
        "priority": TaskPriority.MEDIUM,
        "status": TaskStatus.TODO,
        "due_date": today + timedelta(days=6),
    },
]


async def seed() -> None:
    """Create demo user and sample tasks."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:
        # Check if demo user exists
        result = await session.execute(
            select(User).where(User.email == DEMO_EMAIL)
        )
        existing_user = result.scalar_one_or_none()

        if existing_user:
            print(f"Demo user already exists: {DEMO_EMAIL}")
            user_id = existing_user.id
        else:
            user_id = uuid.uuid4()
            demo_user = User(
                id=user_id,
                email=DEMO_EMAIL,
                full_name=DEMO_FULL_NAME,
                hashed_password=hash_password(DEMO_PASSWORD),
            )
            session.add(demo_user)
            await session.flush()
            print(f"Created demo user: {DEMO_EMAIL} / {DEMO_PASSWORD}")

        # Check existing tasks count
        existing_tasks = await session.execute(
            select(Task).where(Task.user_id == user_id)
        )
        task_count = len(existing_tasks.scalars().all())

        if task_count > 0:
            print(f"Demo user already has {task_count} tasks. Skipping task seeding.")
        else:
            now = datetime.now(timezone.utc)
            for i, task_data in enumerate(SAMPLE_TASKS):
                completed_at = now if task_data["status"] == TaskStatus.COMPLETED else None
                task = Task(
                    id=uuid.uuid4(),
                    title=task_data["title"],
                    description=task_data["description"],
                    priority=task_data["priority"],
                    status=task_data["status"],
                    due_date=task_data["due_date"],
                    completed_at=completed_at,
                    user_id=user_id,
                    created_at=now - timedelta(hours=len(SAMPLE_TASKS) - i),
                    updated_at=now,
                )
                session.add(task)

            print(f"Created {len(SAMPLE_TASKS)} sample tasks for demo user.")

        await session.commit()
        print("Seed completed successfully.")


if __name__ == "__main__":
    asyncio.run(seed())
