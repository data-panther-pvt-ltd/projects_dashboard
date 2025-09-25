from fastapi import FastAPI, Depends, HTTPException, status, Request, Response, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from uuid import uuid4
import os
from pathlib import Path

from database import Base, engine, get_db
from models import User, Organization
from schemas import User as UserSchema, Organization as OrganizationSchema, SigninRequest, SignupResponse
from auth import hash_password, verify_password, create_access_token, verify_token, COOKIE_NAME

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Resolve project root (parent of this backend directory) to store assets under public/uploads
PROJECT_ROOT = Path(__file__).resolve().parent.parent

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/auth/signup", response_model=SignupResponse)
async def signup(
    response: Response,
    db: Session = Depends(get_db),
    email: str = Form(...),
    password: str = Form(...),
    organizationName: str = Form(...),
    colorHex: str = Form("#111827"),
    colors: str | None = Form(None),  # JSON string like ["#123456", "#abcdef"]
    logo: UploadFile | None = File(None),
):
    email_norm = email.strip().lower()
    existing = db.query(User).filter(User.email == email_norm).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already in use")

    logo_url: str | None = None
    if logo is not None:
        upload_dir = PROJECT_ROOT / "public" / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)
        ext = (logo.filename or "png").split(".")[-1]
        file_name = f"{uuid4()}.{ext}"
        file_path = upload_dir / file_name
        with file_path.open("wb") as f:
            f.write(await logo.read())
        # Next.js serves files in public/ at the root path
        logo_url = f"/uploads/{file_name}"

    color_list = None
    if colors:
        try:
            import json
            parsed = json.loads(colors)
            if isinstance(parsed, list) and all(isinstance(c, str) for c in parsed):
                color_list = parsed
        except Exception:
            color_list = None

    org = Organization(
        id=str(uuid4()),
        name=organizationName,
        color_hex=colorHex,
        colors=color_list,
        logo_url=logo_url,
    )
    db.add(org)

    user = User(
        id=str(uuid4()),
        email=email_norm,
        password_hash=hash_password(password),
        organization=org,
    )
    db.add(user)
    db.commit()

    token = create_access_token({"userId": user.id, "organizationId": org.id})
    response.set_cookie(COOKIE_NAME, token, httponly=True, secure=False, samesite="lax", path="/")

    return {"id": user.id, "email": user.email, "organization": {"id": org.id, "name": org.name, "colorHex": org.color_hex, "colors": org.colors, "logoUrl": org.logo_url}}


@app.post("/auth/signin")
async def signin(payload: SigninRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).join(Organization).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"userId": user.id, "organizationId": user.organization_id})
    response.set_cookie(COOKIE_NAME, token, httponly=True, secure=False, samesite="lax", path="/")
    return {"id": user.id, "email": user.email, "organization": {"id": user.organization.id, "name": user.organization.name, "colorHex": user.organization.color_hex, "colors": user.organization.colors, "logoUrl": user.organization.logo_url}}


@app.get("/auth/me")
async def me(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        return Response(status_code=status.HTTP_401_UNAUTHORIZED, content='{"user": null}', media_type="application/json")
    payload = verify_token(token)
    if not payload:
        return Response(status_code=status.HTTP_401_UNAUTHORIZED, content='{"user": null}', media_type="application/json")
    user = db.query(User).filter(User.id == payload.get("userId")).join(Organization).first()
    if not user:
        return Response(status_code=status.HTTP_401_UNAUTHORIZED, content='{"user": null}', media_type="application/json")
    return {"user": {"id": user.id, "email": user.email, "organization": {"id": user.organization.id, "name": user.organization.name, "colorHex": user.organization.color_hex, "logoUrl": user.organization.logo_url}}}


@app.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/")
    return {"ok": True}


@app.get("/org")
async def get_org(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get(COOKIE_NAME)
    payload = verify_token(token) if token else None
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    org = db.query(Organization).filter(Organization.id == payload.get("organizationId")).first()
    return {"organization": {"id": org.id, "name": org.name, "colorHex": org.color_hex, "colors": org.colors, "logoUrl": org.logo_url}}


@app.put("/org")
async def update_org(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    name: str | None = Form(None),
    colorHex: str | None = Form(None),
    colors: str | None = Form(None),  # JSON string array
    logo: UploadFile | None = File(None),
):
    token = request.cookies.get(COOKIE_NAME)
    payload = verify_token(token) if token else None
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    logo_url: str | None = None
    if logo is not None:
        upload_dir = PROJECT_ROOT / "public" / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)
        ext = (logo.filename or "png").split(".")[-1]
        file_name = f"{uuid4()}.{ext}"
        file_path = upload_dir / file_name
        with file_path.open("wb") as f:
            f.write(await logo.read())
        logo_url = f"/uploads/{file_name}"

    # update
    org = db.query(Organization).filter(Organization.id == payload.get("organizationId")).first()
    if name is not None:
        org.name = name
    if colorHex is not None:
        org.color_hex = colorHex
    if colors is not None:
        try:
            import json
            parsed = json.loads(colors)
            if isinstance(parsed, list) and all(isinstance(c, str) for c in parsed):
                org.colors = parsed
        except Exception:
            pass
    if logo_url is not None:
        org.logo_url = logo_url
    db.add(org)
    db.commit()
    db.refresh(org)

    return {"organization": {"id": org.id, "name": org.name, "colorHex": org.color_hex, "colors": org.colors, "logoUrl": org.logo_url}}
