"""Authentication service — register and login logic."""

import logging
import uuid

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, hash_password, verify_password
from app.db.models import User
from app.schemas.auth import Token, UserCreate, UserLogin, UserOut

logger = logging.getLogger(__name__)


async def register_user(db: AsyncSession, user_data: UserCreate) -> UserOut:
    """Register a new user. Raises 400 if email already exists."""
    result = await db.execute(
        select(User).where(User.email == user_data.email)
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )

    new_user = User(
        id=uuid.uuid4(),
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hash_password(user_data.password),
    )
    db.add(new_user)
    await db.flush()
    await db.refresh(new_user)

    logger.info("User registered: %s", new_user.email)
    return UserOut.model_validate(new_user)


async def authenticate_user(db: AsyncSession, login_data: UserLogin) -> Token:
    """Authenticate a user and return a JWT token. Raises 401 on failure."""
    result = await db.execute(
        select(User).where(User.email == login_data.email)
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    logger.info("User logged in: %s", user.email)
    return Token(access_token=access_token)
