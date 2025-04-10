
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.database import Base


class GenderEnum(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, unique=True, index=True)  # External patient ID (e.g., PN-2025-001)
    name = Column(String)
    date_of_birth = Column(Date)
    gender = Column(Enum(GenderEnum))
    contact_phone = Column(String)
    contact_email = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    medical_history = Column(Text, nullable=True)
    current_diagnosis = Column(String, nullable=True)
    status = Column(String, default="Stable")  # Stable, Improving, Deteriorating, Critical
    last_visit_date = Column(Date, nullable=True)
    doctor_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    doctor = relationship("User", back_populates="patients")
    analyses = relationship("Analysis", back_populates="patient", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="patient", cascade="all, delete-orphan")
