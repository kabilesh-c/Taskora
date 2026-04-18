"""Async database engine and session configuration."""

import uuid
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from sqlalchemy.pool import NullPool
from app.core.config import settings

engine_args: dict = {
    "echo": False,
}

if settings.DATABASE_URL.startswith("sqlite"):
    from sqlalchemy.pool import StaticPool
    engine_args["poolclass"] = StaticPool
    engine_args["connect_args"] = {"check_same_thread": False}
else:
    # Supabase Transaction Pooler (PgBouncer) requirements
    engine_args["poolclass"] = NullPool
    engine_args["connect_args"] = {
        "ssl": "require",
        "statement_cache_size": 0,
        "prepared_statement_name_func": lambda: f"__asyncpg_{uuid.uuid4()}__",
    }

engine = create_async_engine(
    settings.DATABASE_URL,
    **engine_args
)

async_session_factory = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db() -> AsyncSession:  # type: ignore[misc]
    """Dependency that yields an async database session."""
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
