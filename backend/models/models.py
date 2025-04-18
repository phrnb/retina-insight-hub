
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from db.database import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    DOCTOR = "doctor"
    TECHNICIAN = "technician"

class AnalysisStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETE = "complete"
    ERROR = "error"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    role = Column(String, default=UserRole.DOCTOR)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    patients = relationship("Patient", back_populates="doctor")
    reports = relationship("Report", back_populates="created_by")
    notifications = relationship("Notification", back_populates="user")

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, unique=True, index=True)  # External ID like PN-2025-001
    name = Column(String)
    age = Column(Integer)
    diagnosis = Column(String)
    status = Column(String)  # Stable, Critical, Improving, Deteriorating
    last_visit = Column(DateTime)
    doctor_id = Column(Integer, ForeignKey("users.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    doctor = relationship("User", back_populates="patients")
    images = relationship("Image", back_populates="patient")
    reports = relationship("Report", back_populates="patient")
    analyses = relationship("Analysis", back_populates="patient")

class Image(Base):
    __tablename__ = "images"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    image_type = Column(String)  # Fundus, OCT, etc.
    upload_date = Column(DateTime, default=datetime.now)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    
    patient = relationship("Patient", back_populates="images")
    analyses = relationship("Analysis", back_populates="image")

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, default=AnalysisStatus.PENDING)
    image_id = Column(Integer, ForeignKey("images.id"))
    patient_id = Column(Integer, ForeignKey("patients.id"))
    ai_diagnosis = Column(String)
    confidence = Column(Float)
    doctor_diagnosis = Column(String)
    analysis_date = Column(DateTime, default=datetime.now)
    heatmap_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    image = relationship("Image", back_populates="analyses")
    patient = relationship("Patient", back_populates="analyses")
    reports = relationship("Report", back_populates="analysis")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(String, unique=True, index=True)  # External ID like RPT-2025-001
    type = Column(String)  # Diagnostic Summary, Treatment Plan, Follow-up
    patient_id = Column(Integer, ForeignKey("patients.id"))
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    generated_date = Column(DateTime, default=datetime.now)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    patient = relationship("Patient", back_populates="reports")
    created_by = relationship("User", back_populates="reports")
    analysis = relationship("Analysis", back_populates="reports")
    report_versions = relationship("ReportVersion", back_populates="report")

class ReportVersion(Base):
    __tablename__ = "report_versions"
    
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id"))
    content = Column(Text)
    version_number = Column(Integer)
    changes_description = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    
    report = relationship("Report", back_populates="report_versions")

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    content = Column(String)
    is_read = Column(Boolean, default=False)
    notification_type = Column(String)  # analysis_complete, system_alert, etc.
    created_at = Column(DateTime, default=datetime.now)
    
    user = relationship("User", back_populates="notifications")

class KnowledgeArticle(Base):
    __tablename__ = "knowledge_articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    category = Column(String)
    author = Column(String)
    published_date = Column(DateTime, default=datetime.now)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
