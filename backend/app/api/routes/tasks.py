"""Task CRUD routes — all require JWT authentication."""

import uuid
from typing import Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.database import get_db
from app.db.models import User
from app.schemas.task import TaskCreate, TaskListResponse, TaskOut, TaskUpdate
from app.services.task_service import (
    create_task,
    delete_task,
    get_task,
    get_tasks,
    update_task,
)

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post(
    "",
    response_model=TaskOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task",
)
async def create_task_route(
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TaskOut:
    """Create a new task for the authenticated user."""
    return await create_task(db, task_data, current_user.id)


@router.get(
    "",
    response_model=TaskListResponse,
    summary="List tasks with pagination and filters",
)
async def list_tasks_route(
    status_filter: Optional[str] = Query(None, alias="status"),
    completed: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TaskListResponse:
    """Get paginated list of tasks for the authenticated user."""
    return await get_tasks(db, current_user.id, status_filter, completed, page, size)


@router.get(
    "/{task_id}",
    response_model=TaskOut,
    summary="Get a single task",
)
async def get_task_route(
    task_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TaskOut:
    """Get a single task by ID (must belong to authenticated user)."""
    return await get_task(db, task_id, current_user.id)


@router.put(
    "/{task_id}",
    response_model=TaskOut,
    summary="Update a task",
)
async def update_task_route(
    task_id: uuid.UUID,
    task_data: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TaskOut:
    """Update a task (all fields optional, must belong to authenticated user)."""
    return await update_task(db, task_id, current_user.id, task_data)


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a task",
)
async def delete_task_route(
    task_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Delete a task by ID (must belong to authenticated user)."""
    await delete_task(db, task_id, current_user.id)
