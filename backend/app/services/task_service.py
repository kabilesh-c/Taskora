"""Task service — CRUD + stats + calendar operations."""

import logging
import math
import uuid
from datetime import date, datetime, timedelta, timezone
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Task, TaskPriority, TaskStatus
from app.schemas.task import TaskCreate, TaskListResponse, TaskOut, TaskStatsOut, TaskUpdate

logger = logging.getLogger(__name__)


async def create_task(
    db: AsyncSession, task_data: TaskCreate, user_id: uuid.UUID
) -> TaskOut:
    """Create a new task for the given user."""
    create_data = task_data.model_dump(exclude_unset=True)
    new_task = Task(
        id=uuid.uuid4(),
        user_id=user_id,
        **create_data
    )
    db.add(new_task)
    await db.flush()
    await db.refresh(new_task)

    logger.info("Task created: %s for user %s", new_task.title, user_id)
    return TaskOut.model_validate(new_task)


async def get_tasks(
    db: AsyncSession,
    user_id: uuid.UUID,
    status_filter: Optional[str] = None,
    completed: Optional[bool] = None,
    page: int = 1,
    size: int = 20,
) -> TaskListResponse:
    """Get paginated tasks for the given user with optional filters."""
    query = select(Task).where(Task.user_id == user_id)

    if status_filter:
        query = query.where(Task.status == status_filter)

    if completed is not None:
        if completed:
            query = query.where(Task.status == TaskStatus.COMPLETED)
        else:
            query = query.where(Task.status != TaskStatus.COMPLETED)

    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar_one()

    # Paginate
    offset = (page - 1) * size
    query = query.order_by(Task.created_at.desc()).offset(offset).limit(size)
    result = await db.execute(query)
    tasks = result.scalars().all()

    pages = math.ceil(total / size) if size > 0 else 0

    return TaskListResponse(
        items=[TaskOut.model_validate(t) for t in tasks],
        total=total,
        page=page,
        size=size,
        pages=pages,
    )


async def get_task(
    db: AsyncSession, task_id: uuid.UUID, user_id: uuid.UUID
) -> TaskOut:
    """Get a single task by ID. Returns 404 if not found or not owned by user."""
    result = await db.execute(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    return TaskOut.model_validate(task)


async def update_task(
    db: AsyncSession,
    task_id: uuid.UUID,
    user_id: uuid.UUID,
    task_data: TaskUpdate,
) -> TaskOut:
    """Update a task. Returns 404 if not found or not owned by user."""
    result = await db.execute(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    update_fields = task_data.model_dump(exclude_unset=True)
    for field, value in update_fields.items():
        setattr(task, field, value)

    # Set completed_at when status changes to completed
    if task_data.status == "completed" and task.completed_at is None:
        task.completed_at = datetime.now(timezone.utc)
    elif task_data.status and task_data.status != "completed":
        task.completed_at = None

    task.updated_at = datetime.now(timezone.utc)

    await db.flush()
    await db.refresh(task)

    logger.info("Task updated: %s", task.title)
    return TaskOut.model_validate(task)


async def delete_task(
    db: AsyncSession, task_id: uuid.UUID, user_id: uuid.UUID
) -> None:
    """Delete a task. Returns 404 if not found or not owned by user."""
    result = await db.execute(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    await db.delete(task)
    logger.info("Task deleted: %s", task_id)


async def get_task_stats(
    db: AsyncSession, user_id: uuid.UUID
) -> TaskStatsOut:
    """Return aggregate stats for the authenticated user's tasks."""
    today = date.today()

    # Total
    total_res = await db.execute(
        select(func.count(Task.id)).where(Task.user_id == user_id)
    )
    total = total_res.scalar_one() or 0

    # By status
    completed_res = await db.execute(
        select(func.count(Task.id)).where(
            Task.user_id == user_id, Task.status == TaskStatus.COMPLETED
        )
    )
    completed = completed_res.scalar_one() or 0

    in_progress_res = await db.execute(
        select(func.count(Task.id)).where(
            Task.user_id == user_id, Task.status == TaskStatus.IN_PROGRESS
        )
    )
    in_progress = in_progress_res.scalar_one() or 0

    todo_res = await db.execute(
        select(func.count(Task.id)).where(
            Task.user_id == user_id, Task.status == TaskStatus.TODO
        )
    )
    todo = todo_res.scalar_one() or 0

    # Urgent
    urgent_res = await db.execute(
        select(func.count(Task.id)).where(
            Task.user_id == user_id, Task.priority == TaskPriority.URGENT
        )
    )
    urgent = urgent_res.scalar_one() or 0

    # Overdue: due_date < today AND not completed
    overdue_res = await db.execute(
        select(func.count(Task.id)).where(
            Task.user_id == user_id,
            Task.due_date < today,
            Task.status != TaskStatus.COMPLETED,
        )
    )
    overdue = overdue_res.scalar_one() or 0

    # By priority
    by_priority: dict[str, int] = {}
    for p in TaskPriority:
        p_res = await db.execute(
            select(func.count(Task.id)).where(
                Task.user_id == user_id, Task.priority == p
            )
        )
        by_priority[p.value] = p_res.scalar_one() or 0

    completion_rate = round((completed / total * 100), 1) if total > 0 else 0.0

    return TaskStatsOut(
        total=total,
        completed=completed,
        in_progress=in_progress,
        todo=todo,
        urgent=urgent,
        completion_rate=completion_rate,
        overdue=overdue,
        by_priority=by_priority,
    )


async def get_calendar_tasks(
    db: AsyncSession, user_id: uuid.UUID, week_start: date
) -> dict[str, list[TaskOut]]:
    """Return tasks grouped by due_date for a 7-day window starting week_start."""
    week_end = week_start + timedelta(days=6)

    result = await db.execute(
        select(Task).where(
            Task.user_id == user_id,
            Task.due_date >= week_start,
            Task.due_date <= week_end,
        ).order_by(Task.due_date, Task.created_at)
    )
    tasks = result.scalars().all()

    grouped: dict[str, list[TaskOut]] = {}
    for task in tasks:
        key = str(task.due_date)
        if key not in grouped:
            grouped[key] = []
        grouped[key].append(TaskOut.model_validate(task))

    return grouped
