
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Union
from datetime import datetime
import enum
from models.models import UserRole, AnalysisStatus

# Auth schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: Optional[str] = UserRole.DOCTOR

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Patient schemas
class PatientBase(BaseModel):
    name: str
    age: int
    diagnosis: str
    status: str
    last_visit: datetime

class PatientCreate(PatientBase):
    patient_id: Optional[str] = None

class Patient(PatientBase):
    id: int
    patient_id: str
    doctor_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Image schemas
class ImageBase(BaseModel):
    filename: str
    image_type: str

class ImageCreate(ImageBase):
    patient_id: int

class Image(ImageBase):
    id: int
    file_path: str
    upload_date: datetime
    patient_id: int
    
    class Config:
        from_attributes = True

# Analysis schemas
class AnalysisBase(BaseModel):
    image_id: int
    patient_id: int

class AnalysisCreate(AnalysisBase):
    pass

class Analysis(AnalysisBase):
    id: int
    status: str
    ai_diagnosis: Optional[str] = None
    confidence: Optional[float] = None
    doctor_diagnosis: Optional[str] = None
    analysis_date: datetime
    heatmap_path: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Report schemas
class ReportBase(BaseModel):
    type: str
    patient_id: int
    analysis_id: Optional[int] = None
    content: str

class ReportCreate(ReportBase):
    report_id: Optional[str] = None

class Report(ReportBase):
    id: int
    report_id: str
    created_by_id: int
    generated_date: datetime
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Report Version schemas
class ReportVersionBase(BaseModel):
    report_id: int
    content: str
    version_number: int
    changes_description: str

class ReportVersionCreate(ReportVersionBase):
    pass

class ReportVersion(ReportVersionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Notification schemas
class NotificationBase(BaseModel):
    title: str
    content: str
    notification_type: str

class NotificationCreate(NotificationBase):
    user_id: int

class Notification(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Knowledge Article schemas
class KnowledgeArticleBase(BaseModel):
    title: str
    content: str
    category: str
    author: str

class KnowledgeArticleCreate(KnowledgeArticleBase):
    pass

class KnowledgeArticle(KnowledgeArticleBase):
    id: int
    published_date: datetime
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
