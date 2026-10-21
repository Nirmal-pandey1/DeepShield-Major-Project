"""Copy DeepShield accounts and upload metadata from SQLite into configured MySQL.

This is a copy-only migration: it preserves the source SQLite database and
refuses to overwrite a MySQL row whose primary key already has different data.
"""

import os
from pathlib import Path

from sqlalchemy import create_engine, inspect, select

import db_models
from database import Base, DATABASE_URL


SOURCE_URL = os.getenv("SQLITE_SOURCE_URL", "sqlite:///./deepshield.db")
source_path = SOURCE_URL.removeprefix("sqlite:///")
if not Path(source_path).is_file():
    raise SystemExit(f"SQLite source database not found: {source_path}")

source_engine = create_engine(
    SOURCE_URL,
    connect_args={"check_same_thread": False},
)
target_engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_recycle=1800)

source_tables = set(inspect(source_engine).get_table_names())
required_tables = (db_models.User.__table__, db_models.Upload.__table__)
missing = [table.name for table in required_tables if table.name not in source_tables]
if missing:
    raise SystemExit(f"SQLite database is missing expected tables: {', '.join(missing)}")

Base.metadata.create_all(bind=target_engine)

copied = {table.name: 0 for table in required_tables}
skipped = {table.name: 0 for table in required_tables}

try:
    with source_engine.connect() as source, target_engine.begin() as target:
        for table in required_tables:
            rows = source.execute(select(table)).mappings()
            for row in rows:
                values = dict(row)
                existing = target.execute(
                    select(table).where(table.c.id == values["id"])
                ).mappings().first()
                if existing is not None:
                    if dict(existing) != values:
                        raise RuntimeError(
                            f"Conflicting {table.name} row id={values['id']} in MySQL; "
                            "no rows from this transaction were copied."
                        )
                    skipped[table.name] += 1
                    continue
                target.execute(table.insert().values(**values))
                copied[table.name] += 1
finally:
    source_engine.dispose()
    target_engine.dispose()

for table_name in copied:
    print(
        f"{table_name}: copied {copied[table_name]}, "
        f"already present {skipped[table_name]}"
    )
