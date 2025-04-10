
from typing import Optional, List
from datetime import date
from pydantic import BaseModel, EmailStr

from app.db.models.patient import GenderEnum


class PatientBase(BaseModel):
    name: str
    date_of_birth: date
    gender: GenderEnum
    contact_phone: str
    contact_email: Optional[EmailStr] = None
    address: Optional[str] = None
    medical_history: Optional[str] = None
    current_diagnosis: Optional[str] = None
    status: str = "Stable"


class PatientCreate(PatientBase):
    pass


class PatientUpdate(PatientBase):
    name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[GenderEnum] = None
    contact_phone: Optional[str] = None


class Patient(PatientBase):
    id: int
    patient_id: str
    last_visit_date: Optional[date] = None
    doctor_id: int

    class Config:
        orm_mode = True
