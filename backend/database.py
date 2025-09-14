# In database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from config import settings

# The engine is the entry point to your database
engine = create_async_engine(settings.DATABASE_URL)

# This session factory will create new database sessions when called
AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession
)

# This is the base class your database models will inherit from
Base = declarative_base()

# This is a dependency for your API endpoints to get a database session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session