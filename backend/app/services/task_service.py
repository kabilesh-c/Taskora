"""Task service — CRUD operations for tasks."""

import logging
import math
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Task, TaskStatus
from app.schemas.task import TaskCreate, TaskListResponse, TaskOut, TaskUpdate

logger = logging.getLogger(__name__)


async def create_task(
    db: AsyncSession, task_data: TaskCreate, user_id: uuid.UUID
) -> TaskOut:
    """Create a new task for the given user."""
    new_task = Task(
        id=uuid.uuid4(),
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority,
        due_date=task_data.due_date,
        user_id=user_id,
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
    count_query = select(func.count()).select_from(
        query.subquery()
    )
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
