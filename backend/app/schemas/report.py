
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from app.db.models.report import ReportType


class ReportVersionBase(BaseModel):
    content: str
    change_summary: Optional[str] = None


class ReportVersionCreate(ReportVersionBase):
    report_id: int


class ReportVersion(ReportVersionBase):
    id: int
    report_id: int
    version_number: int
    created_at: datetime
    created_by_id: int

    class Config:
        orm_mode = True


class ReportBase(BaseModel):
    patient_id: int
    analysis_id: Optional[int] = None
    report_type: ReportType
    title: str


class ReportCreate(ReportBase):
    initial_content: str


class ReportUpdate(BaseModel):
    title: Optional[str] = None
    report_type: Optional[ReportType] = None


class Report(ReportBase):
    id: int
    report_id: str
    author_id: int
    created_at: datetime
    versions: List[ReportVersion] = []

    class Config:
        orm_mode = True
