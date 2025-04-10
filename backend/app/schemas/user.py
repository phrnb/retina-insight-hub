
from typing import Optional
from pydantic import BaseModel, EmailStr

from app.db.models.user import UserRole


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = True


class UserCreate(UserBase):
    email: EmailStr
    password: str
    full_name: str
    role: UserRole = UserRole.DOCTOR


class UserUpdate(UserBase):
    password: Optional[str] = None


class User(UserBase):
    id: int
    is_verified: bool

    class Config:
        orm_mode = True
