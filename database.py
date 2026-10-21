import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is required. Set it to your hosted MySQL connection URL in .env."
    )
if not DATABASE_URL.startswith("mysql+pymysql://"):
    raise RuntimeError(
        "DeepShield now requires MySQL. Use a mysql+pymysql:// DATABASE_URL."
    )

SSL_CA_PATH = os.getenv("SSL_CA_PATH")
connect_args = {}
if SSL_CA_PATH:
    connect_args["ssl"] = {"ca": SSL_CA_PATH}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    pool_recycle=1800,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
