
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from app.db.models.analysis import ImageType, AnalysisStatus


class AnalysisImageBase(BaseModel):
    image_type: ImageType
    metadata: Optional[str] = None


class AnalysisImageCreate(AnalysisImageBase):
    analysis_id: int
    image_path: str
    heatmap_path: Optional[str] = None


class AnalysisImage(AnalysisImageBase):
    id: int
    analysis_id: int
    image_path: str
    heatmap_path: Optional[str] = None
    uploaded_at: datetime

    class Config:
        orm_mode = True


class AnalysisBase(BaseModel):
    patient_id: int
    diagnosis: Optional[str] = None
    confidence_score: Optional[float] = None
    severity: Optional[str] = None
    doctor_notes: Optional[str] = None
    status: AnalysisStatus = AnalysisStatus.PENDING


class AnalysisCreate(AnalysisBase):
    pass


class AnalysisUpdate(BaseModel):
    diagnosis: Optional[str] = None
    confidence_score: Optional[float] = None
    severity: Optional[str] = None
    doctor_notes: Optional[str] = None
    status: Optional[AnalysisStatus] = None


class Analysis(AnalysisBase):
    id: int
    analysis_id: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    created_by_id: int
    images: List[AnalysisImage] = []

    class Config:
        orm_mode = True
