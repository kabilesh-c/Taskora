"""Admin routes — demo data reset, secured with X-Admin-Key header."""

import logging
import uuid
from datetime import date

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.database import get_db
from app.db.models import Task, TaskPriority, TaskStatus, User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["Admin"])

DEMO_EMAIL = "demo@weboin.com"

SEED_TASKS = [
    {"title": "SEO Audit — TechCorp Client", "priority": "high", "status": "in_progress"},
    {"title": "Google Ads Campaign Q2", "priority": "medium", "status": "completed"},
    {"title": "Design System Audit", "priority": "urgent", "status": "in_progress"},
    {"title": "Social Media Calendar — May", "priority": "medium", "status": "todo"},
    {"title": "Website Redesign — ABC Corp", "priority": "high", "status": "in_progress"},
    {"title": "Email Marketing Campaign", "priority": "medium", "status": "todo"},
    {"title": "Analytics Report Q1", "priority": "high", "status": "completed"},
    {"title": "Brand Identity Update", "priority": "low", "status": "todo"},
    {"title": "Content Strategy Meeting", "priority": "medium", "status": "in_progress"},
    {"title": "Client Onboarding — XYZ Ltd", "priority": "high", "status": "todo"},
    {"title": "Facebook Ads Optimization", "priority": "medium", "status": "in_progress"},
    {"title": "PPC Campaign Review", "priority": "urgent", "status": "todo"},
    {"title": "Influencer Partnership Brief", "priority": "low", "status": "todo"},
    {"title": "Monthly Performance Report", "priority": "high", "status": "in_progress"},
    {"title": "Team Training — GA4 Migration", "priority": "medium", "status": "todo"},
]


@router.post(
    "/reset-demo",
    summary="Reset demo user data to initial seed state",
    status_code=status.HTTP_200_OK,
)
async def reset_demo_route(
    x_admin_key: str = Header(..., alias="X-Admin-Key"),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Delete all demo user tasks and re-seed with the 15 Weboin sample tasks."""
    if not settings.ADMIN_SECRET or x_admin_key != settings.ADMIN_SECRET:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid admin key.",
        )

    # Find demo user
    result = await db.execute(select(User).where(User.email == DEMO_EMAIL))
    demo_user = result.scalar_one_or_none()

    if not demo_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Demo user not found. Run seed.py first.",
        )

    # Delete all demo tasks
    await db.execute(delete(Task).where(Task.user_id == demo_user.id))
    await db.flush()

    # Re-seed
    today = date.today()
    for i, t in enumerate(SEED_TASKS):
        task = Task(
            id=uuid.uuid4(),
            title=t["title"],
            priority=TaskPriority(t["priority"]),
            status=TaskStatus(t["status"]),
            user_id=demo_user.id,
            due_date=date(today.year, today.month, min(today.day + i, 28)),
        )
        if t["status"] == "completed":
            from datetime import datetime, timezone
            task.completed_at = datetime.now(timezone.utc)
        db.add(task)

    await db.flush()
    logger.info("Demo data reset successfully for user: %s", DEMO_EMAIL)

    return {"message": "Demo data reset successfully", "tasks_seeded": len(SEED_TASKS)}
