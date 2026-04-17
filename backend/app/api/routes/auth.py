"""Authentication routes — register and login."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.schemas.auth import Token, UserCreate, UserLogin, UserOut
from app.services.auth_service import authenticate_user, register_user

router = APIRouter(tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> UserOut:
    """Create a new user account with email, full name, and password."""
    return await register_user(db, user_data)


@router.post(
    "/login",
    response_model=Token,
    summary="Login and get JWT token",
)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db),
) -> Token:
    """Authenticate with email and password, receive a JWT access token."""
    return await authenticate_user(db, login_data)
