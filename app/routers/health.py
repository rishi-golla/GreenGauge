"""
Health check router.

GET /health  — confirms the API is running and the DB is reachable.
Used by Docker/Kubernetes liveness probes and load-balancers.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Returns {"status": "ok"} if the API is up and the database is reachable.
    Returns 503 implicitly if the DB connection throws.
    """
    # A cheap query to verify the DB connection is alive
    db.execute(text("SELECT 1"))
    return {"status": "ok", "db": "reachable"}
