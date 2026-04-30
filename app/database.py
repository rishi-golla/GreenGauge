"""
Database connection and session management.

- `engine`      : the SQLAlchemy engine (one per process)
- `SessionLocal`: a factory for database sessions
- `get_db`      : FastAPI dependency that yields a session and closes it when done
- `Base`        : the declarative base that all models inherit from
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import settings

# Create the engine.
# pool_pre_ping=True checks connections before using them, avoiding stale-connection errors.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)

# Each call to SessionLocal() gives a new database session.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# All SQLAlchemy models inherit from this Base.
Base = declarative_base()


def get_db():
    """
    FastAPI dependency: yields a DB session for one request, then closes it.

    Usage in a router:
        from fastapi import Depends
        from app.database import get_db

        @router.get("/example")
        def example(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
