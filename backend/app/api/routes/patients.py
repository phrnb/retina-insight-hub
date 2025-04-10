
from typing import Any, List
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models.patient import Patient
from app.schemas.patient import Patient as PatientSchema, PatientCreate, PatientUpdate
from app.api.deps import get_current_user, get_admin_or_doctor
from app.db.models.user import User

router = APIRouter()


@router.get("/", response_model=List[PatientSchema])
def get_patients(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    search: str = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all patients.
    """
    query = db.query(Patient)
    
    # Filter by doctor if user is not admin
    if current_user.role.value != "admin":
        query = query.filter(Patient.doctor_id == current_user.id)
    
    # Search
    if search:
        query = query.filter(
            (Patient.name.ilike(f"%{search}%")) |
            (Patient.patient_id.ilike(f"%{search}%")) |
            (Patient.current_diagnosis.ilike(f"%{search}%"))
        )
    
    patients = query.offset(skip).limit(limit).all()
    return patients


@router.post("/", response_model=PatientSchema)
def create_patient(
    *,
    db: Session = Depends(get_db),
    patient_in: PatientCreate,
    current_user: User = Depends(get_admin_or_doctor),
) -> Any:
    """
    Create new patient record.
    """
    # Generate a patient ID
    prefix = "PN-"
    year = "2025"
    sequence_num = db.query(Patient).count() + 1
    patient_id = f"{prefix}{year}-{str(sequence_num).zfill(3)}"
    
    # Create patient
    db_patient = Patient(
        patient_id=patient_id,
        name=patient_in.name,
        date_of_birth=patient_in.date_of_birth,
        gender=patient_in.gender,
        contact_phone=patient_in.contact_phone,
        contact_email=patient_in.contact_email,
        address=patient_in.address,
        medical_history=patient_in.medical_history,
        current_diagnosis=patient_in.current_diagnosis,
        status=patient_in.status,
        doctor_id=current_user.id,
    )
    
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    
    return db_patient


@router.get("/{patient_id}", response_model=PatientSchema)
def get_patient(
    patient_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get patient by ID.
    """
    # Look up by database ID or external patient ID
    try:
        if patient_id.isdigit():
            patient = db.query(Patient).filter(Patient.id == int(patient_id)).first()
        else:
            patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    except ValueError:
        patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    
    # Check permissions
    if current_user.role.value != "admin" and patient.doctor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    return patient


@router.put("/{patient_id}", response_model=PatientSchema)
def update_patient(
    *,
    db: Session = Depends(get_db),
    patient_id: str,
    patient_in: PatientUpdate,
    current_user: User = Depends(get_admin_or_doctor),
) -> Any:
    """
    Update patient information.
    """
    # Look up by database ID or external patient ID
    try:
        if patient_id.isdigit():
            patient = db.query(Patient).filter(Patient.id == int(patient_id)).first()
        else:
            patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    except ValueError:
        patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    
    # Check permissions
    if current_user.role.value != "admin" and patient.doctor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    # Update attributes that were provided
    for field, value in patient_in.dict(exclude_unset=True).items():
        setattr(patient, field, value)
    
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(
    *,
    db: Session = Depends(get_db),
    patient_id: str,
    current_user: User = Depends(get_admin_or_doctor),
) -> Any:
    """
    Delete patient record.
    """
    # Look up by database ID or external patient ID
    try:
        if patient_id.isdigit():
            patient = db.query(Patient).filter(Patient.id == int(patient_id)).first()
        else:
            patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    except ValueError:
        patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
    
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    
    # Check permissions - only admin or the assigned doctor can delete
    if current_user.role.value != "admin" and patient.doctor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    db.delete(patient)
    db.commit()
    
    return None
