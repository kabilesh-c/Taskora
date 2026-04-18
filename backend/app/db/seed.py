"""Seed script to create the initial demo user and tasks."""

import logging
import uuid
from datetime import date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.db.models import Task, TaskPriority, TaskStatus, User

logger = logging.getLogger(__name__)

DEMO_EMAIL = "demo@weboin.com"
DEMO_PASSWORD = "demo"

SEED_TASKS = [
    {"title": "SEO Audit — TechCorp Client", "priority": "high", "status": "in_progress"},
    {"title": "Google Ads Campaign Q2", "priority": "medium", "status": "completed"},
    {"title": "Design System Audit", "priority": "urgent", "status": "in_progress"},
    {"title": "Social Media Calendar — May", "priority": "medium", "status": "todo"},
    {"title": "Website Redesign — ABC Corp", "priority": "high", "status": "in_progress"},
    {"title": "Email Marketing Campaign", "priority": "medium", "status": "todo"},
    {"title": "Analytics Report Q1", "priority": "high", "status": "completed"},
]

async def seed_demo_data(db: AsyncSession) -> None:
    """Create demo user and tasks if they don't exist."""
    result = await db.execute(select(User).where(User.email == DEMO_EMAIL))
    user = result.scalar_one_or_none()

    if user is not None:
        return  # Already seeded

    logger.info("Seeding demo account: %s", DEMO_EMAIL)

    user = User(
        id=uuid.uuid4(),
        email=DEMO_EMAIL,
        hashed_password=hash_password(DEMO_PASSWORD),
        full_name="Weboin Demo",
    )
    db.add(user)
    await db.flush()

    today = date.today()
    for i, t in enumerate(SEED_TASKS):
        task = Task(
            id=uuid.uuid4(),
            title=t["title"],
            priority=TaskPriority(t["priority"]),
            status=TaskStatus(t["status"]),
            user_id=user.id,
            due_date=date(today.year, today.month, min(today.day + i, 28)),
        )
        if t["status"] == "completed":
            from datetime import datetime, timezone
            task.completed_at = datetime.now(timezone.utc)
        db.add(task)

    await db.commit()
    logger.info("Demo data seeded successfully.")
