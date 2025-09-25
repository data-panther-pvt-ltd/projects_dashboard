Setup

1. Create and fill .env (copy from .env.example)
2. Create database in PostgreSQL matching DATABASE_URL
3. Create a virtualenv and install requirements:

```
python -m venv .venv
. .venv/Scripts/activate
pip install -r backend/requirements.txt
```

4. Run the server:

```
uvicorn backend.main:app --reload --port 8000
```
