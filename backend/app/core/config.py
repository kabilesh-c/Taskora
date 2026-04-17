"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from .env file."""

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    ALLOWED_ORIGINS: str = "*"
    GEMINI_API_KEY: str = ""  # Phase 2

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
