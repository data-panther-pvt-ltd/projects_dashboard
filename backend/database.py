# import os
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, DeclarativeBase
# from dotenv import load_dotenv

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# engine = create_engine(DATABASE_URL, pool_pre_ping=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# class Base(DeclarativeBase):
#     pass


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch the database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# Check if the URL is loaded
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in environment variables.")

# Create engine and session
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
class Base(DeclarativeBase):
    pass

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Connection test
def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Database connection successful:", result.scalar())
    except Exception as e:
        print("❌ Failed to connect to database:")
        print(e)

# Run connection test when script is executed directly
if __name__ == "__main__":
    test_connection()
