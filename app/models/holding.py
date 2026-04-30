"""
Holding model.

Represents a single stock/ETF position inside a portfolio.
Ticker is always stored in UPPERCASE (enforced at the service layer during import/create).
"""

from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship

from app.database import Base


class Holding(Base):
    __tablename__ = "holdings"

    id = Column(Integer, primary_key=True, index=True)

    # The portfolio this holding belongs to
    portfolio_id = Column(Integer, ForeignKey("portfolios.id", ondelete="CASCADE"), nullable=False)

    # Ticker symbol, always UPPERCASE (e.g. "AAPL", "MSFT")
    ticker = Column(String(20), nullable=False, index=True)

    # Number of shares held (supports fractional shares)
    shares = Column(Numeric(precision=18, scale=6), nullable=False)

    # Price paid per share at time of purchase (for cost basis)
    purchase_price = Column(Numeric(precision=18, scale=6), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationship back to portfolio
    portfolio = relationship("Portfolio", back_populates="holdings")

    def __repr__(self) -> str:
        return f"<Holding id={self.id} ticker={self.ticker!r} shares={self.shares}>"
