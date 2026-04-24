import os
from sqlalchemy import create_engine, Column, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Neon connection string from connector or env
DATABASE_URL = os.getenv(
    "SPENDE_URL",
    os.getenv("DATABASE_URL", "")
)

# Create engine with proper SSL for Neon
if not DATABASE_URL:
    raise ValueError("DATABASE_URL or SPENDE_URL environment variable is required")

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    connect_args={"sslmode": "require"} if "postgresql" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class PreRegistration(Base):
    """Email pre-registration model"""
    __tablename__ = "pre_registrations"

    email = Column(String(255), primary_key=True, unique=True, index=True)
    created_at = Column(DateTime, server_default=func.now())


def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Create tables"""
    Base.metadata.create_all(bind=engine)
