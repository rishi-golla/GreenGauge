"""
Application configuration.
All secrets and environment-specific settings are loaded from environment variables.
Never hard-code secrets in this file.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # --- Database ---
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/greengauge"

    # --- Redis (optional caching) ---
    REDIS_URL: str = "redis://localhost:6379/0"

    # --- Alpha Vantage ---
    ALPHA_VANTAGE_API_KEY: str = "demo"

    # --- App ---
    APP_ENV: str = "development"  # "development" | "production"
    DEBUG: bool = True

    class Config:
        # Load from a .env file if present
        env_file = ".env"
        env_file_encoding = "utf-8"


# Single shared instance — import this everywhere
settings = Settings()
