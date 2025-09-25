# AI Projects Dashboard

## Run Backend (FastAPI)

1. Create PostgreSQL database and set `DATABASE_URL`.
2. Copy `backend/.env.example` to `backend/.env` and edit values.
3. Create virtualenv and install requirements:

```
python -m venv .venv
. .venv/Scripts/activate
pip install -r backend/requirements.txt
```

4. Start server:

```
uvicorn backend.main:app --reload --port 8000
```

## Run Frontend (Next.js)

- Ensure `NEXT_PUBLIC_BACKEND_URL` is set to `http://localhost:8000` (e.g., in `.env.local`).
- Start Next.js dev server:

```
npm run dev
```
