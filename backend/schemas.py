from pydantic import BaseModel, EmailStr
from typing import Optional, List


class Organization(BaseModel):
    id: str
    name: str
    colorHex: str
    colors: Optional[List[str]] = None
    logoUrl: Optional[str] = None

    class Config:
        from_attributes = True
        populate_by_name = True


class User(BaseModel):
    id: str
    email: EmailStr
    organization: Organization

    class Config:
        from_attributes = True


class SigninRequest(BaseModel):
    email: EmailStr
    password: str


class SignupResponse(BaseModel):
    id: str
    email: EmailStr
    organization: Organization
