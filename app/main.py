"""
Application entry point.

Creates the FastAPI app, registers all routers, and configures middleware.
"""

from fastapi import FastAPI

from app.config import settings
from app.routers import health

app = FastAPI(
    title="GreenGauge ESG Portfolio API",
    description="Backend API for ESG portfolio risk analysis.",
    version="0.1.0",
    # Disable docs in production if desired
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(health.router)

# Future routers will be added here:
# app.include_router(portfolios.router, prefix="/portfolios")
# app.include_router(holdings.router,   prefix="/portfolios")
