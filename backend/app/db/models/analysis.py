
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from sqlalchemy import Enum

from app.db.database import Base


class ImageType(enum.Enum):
    FUNDUS = "Fundus"
    OCT = "OCT"
    VISUAL_FIELD = "Visual Field"
    OTHER = "Other"


class AnalysisStatus(enum.Enum):
    PENDING = "Pending"
    PROCESSING = "Processing"
    COMPLETED = "Completed"
    FAILED = "Failed"
    REVIEWED = "Reviewed"


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(String, unique=True, index=True)  # Formatted ID (e.g., RES-2025-001)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    status = Column(Enum(AnalysisStatus), default=AnalysisStatus.PENDING)
    diagnosis = Column(String, nullable=True)
    confidence_score = Column(Float, nullable=True)
    severity = Column(String, nullable=True)
    doctor_notes = Column(Text, nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    patient = relationship("Patient", back_populates="analyses")
    created_by = relationship("User", back_populates="analyses")
    images = relationship("AnalysisImage", back_populates="analysis", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="analysis")


class AnalysisImage(Base):
    __tablename__ = "analysis_images"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    image_path = Column(String)  # Path to the stored image
    heatmap_path = Column(String, nullable=True)  # Path to AI-generated heatmap overlay
    image_type = Column(Enum(ImageType))
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    metadata = Column(Text, nullable=True)  # JSON string with metadata

    # Relationships
    analysis = relationship("Analysis", back_populates="images")
