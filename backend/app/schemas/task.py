"""Pydantic schemas for task endpoints."""

import uuid
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    """Schema for creating a new task."""

    title: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = None
    priority: str = Field(default="medium", pattern="^(low|medium|high|urgent)$")
    due_date: Optional[date] = None
    
    project_category: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    progress: int = 0
    team_members: Optional[list[str]] = None
    accent_color: Optional[str] = None
    link: Optional[str] = None
    stats_budget: Optional[str] = None
    stats_people: Optional[int] = None
    stats_comments: Optional[int] = None
    sub_tasks: Optional[list[str]] = None


class TaskUpdate(BaseModel):
    """Schema for updating an existing task (all fields optional)."""

    title: Optional[str] = Field(None, min_length=1, max_length=500)
    description: Optional[str] = None
    priority: Optional[str] = Field(None, pattern="^(low|medium|high|urgent)$")
    status: Optional[str] = Field(None, pattern="^(todo|in_progress|completed)$")
    due_date: Optional[date] = None

    project_category: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    progress: Optional[int] = None
    team_members: Optional[list[str]] = None
    accent_color: Optional[str] = None
    link: Optional[str] = None
    stats_budget: Optional[str] = None
    stats_people: Optional[int] = None
    stats_comments: Optional[int] = None
    sub_tasks: Optional[list[str]] = None


class TaskOut(BaseModel):
    """Schema for task response."""

    id: uuid.UUID
    title: str
    description: Optional[str] = None
    priority: str
    status: str
    due_date: Optional[date] = None
    
    project_category: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    progress: int
    team_members: list[str] | None = None
    accent_color: Optional[str] = None
    link: Optional[str] = None
    stats_budget: Optional[str] = None
    stats_people: Optional[int] = None
    stats_comments: Optional[int] = None
    sub_tasks: list[str] | None = None

    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None
    user_id: uuid.UUID

    model_config = {"from_attributes": True}


class TaskListResponse(BaseModel):
    """Paginated task list response."""

    items: list[TaskOut]
    total: int
    page: int
    size: int
    pages: int


class TaskStatsOut(BaseModel):
    """Aggregate task statistics for the authenticated user."""

    total: int
    completed: int
    in_progress: int
    todo: int
    urgent: int
    completion_rate: float
    overdue: int
    by_priority: dict[str, int]


class VoiceParseRequest(BaseModel):
    """Request body for voice transcript parsing."""

    transcript: str = Field(..., min_length=1, max_length=2000)


class VoiceParseResponse(BaseModel):
    """Structured task data extracted from voice transcript."""

    title: str
    description: Optional[str] = None
    priority: str = "medium"
    due_date: Optional[str] = None
