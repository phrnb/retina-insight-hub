
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Table, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.database import Base


class ReportType(enum.Enum):
    DIAGNOSTIC = "Diagnostic Summary"
    TREATMENT = "Treatment Plan"
    FOLLOWUP = "Follow-up Analysis"
    SECOND_OPINION = "Second Opinion"


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(String, unique=True, index=True)  # External report ID (e.g., RPT-2025-001)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    report_type = Column(Enum(ReportType))
    title = Column(String)

    # Relationships
    patient = relationship("Patient", back_populates="reports")
    author = relationship("User", back_populates="reports")
    analysis = relationship("Analysis", back_populates="reports")
    versions = relationship("ReportVersion", back_populates="report", cascade="all, delete-orphan")


class ReportVersion(Base):
    __tablename__ = "report_versions"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id"))
    version_number = Column(Integer)
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by_id = Column(Integer, ForeignKey("users.id"))
    change_summary = Column(String, nullable=True)

    # Relationships
    report = relationship("Report", back_populates="versions")
    created_by = relationship("User", foreign_keys=[created_by_id])
