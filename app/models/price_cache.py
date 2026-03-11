"""
PriceCache model.

Stores the latest market price for a ticker fetched from Alpha Vantage (or any adapter).
Acts as a simple DB-level cache to avoid hitting the external API on every request.

Refresh strategy: before reading a price, check if `fetched_at` is older than a threshold
(e.g. 15 minutes) and re-fetch if so.
"""

from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, Numeric, String

from app.database import Base


class PriceCache(Base):
    __tablename__ = "price_cache"

    id = Column(Integer, primary_key=True, index=True)

    # Ticker symbol, always UPPERCASE
    ticker = Column(String(20), unique=True, nullable=False, index=True)

    # Latest known price
    price = Column(Numeric(precision=18, scale=6), nullable=False)

    # When this price was fetched from the external API
    fetched_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self) -> str:
        return f"<PriceCache ticker={self.ticker!r} price={self.price} fetched_at={self.fetched_at}>"
