
from sqlalchemy import Column, String, Boolean, Integer, Enum
from sqlalchemy.orm import relationship

from app.db.database import Base
import enum


class UserRole(enum.Enum):
    ADMIN = "admin"
    DOCTOR = "doctor"
    TECHNICIAN = "technician"
    RESEARCHER = "researcher"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.DOCTOR)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    # Relationships
    patients = relationship("Patient", back_populates="doctor")
    reports = relationship("Report", back_populates="author")
    analyses = relationship("Analysis", back_populates="created_by")
