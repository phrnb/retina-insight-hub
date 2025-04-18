
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from schemas.schemas import Patient, PatientCreate
from models.models import Patient as PatientModel, User
from db.database import get_db
from auth.jwt import get_current_active_user

router = APIRouter()

@router.post("/patients/", response_model=Patient)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    # Generate patient_id if not provided
    if not patient.patient_id:
        latest_patient = db.query(PatientModel).order_by(PatientModel.id.desc()).first()
        patient_number = 1
        if latest_patient and latest_patient.patient_id and latest_patient.patient_id.startswith("PN-"):
            try:
                patient_number = int(latest_patient.patient_id.split("-")[-1]) + 1
            except ValueError:
                patient_number = 1
        patient_id = f"PN-{datetime.now().year}-{patient_number:03d}"
    else:
        patient_id = patient.patient_id
    
    db_patient = PatientModel(
        patient_id=patient_id,
        name=patient.name,
        age=patient.age,
        diagnosis=patient.diagnosis,
        status=patient.status,
        last_visit=patient.last_visit,
        doctor_id=current_user.id
    )
    
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.get("/patients/", response_model=List[Patient])
def get_patients(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None, 
    search: Optional[str] = None,
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    query = db.query(PatientModel)
    
    # Apply filters if provided
    if status:
        query = query.filter(PatientModel.status == status)
    
    if search:
        query = query.filter(
            (PatientModel.name.ilike(f"%{search}%")) | 
            (PatientModel.patient_id.ilike(f"%{search}%")) |
            (PatientModel.diagnosis.ilike(f"%{search}%"))
        )
    
    # Get patients with pagination
    patients = query.offset(skip).limit(limit).all()
    return patients

@router.get("/patients/{patient_id}", response_model=Patient)
def get_patient(patient_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    # Try to get by ID first, then by patient_id
    try:
        patient_id_int = int(patient_id)
        db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id_int).first()
    except ValueError:
        db_patient = db.query(PatientModel).filter(PatientModel.patient_id == patient_id).first()
    
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@router.put("/patients/{patient_id}", response_model=Patient)
def update_patient(
    patient_id: str, 
    patient_data: PatientCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    # Try to get by ID first, then by patient_id
    try:
        patient_id_int = int(patient_id)
        db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id_int).first()
    except ValueError:
        db_patient = db.query(PatientModel).filter(PatientModel.patient_id == patient_id).first()
    
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Update patient data
    for key, value in patient_data.dict().items():
        if key != "patient_id" and hasattr(db_patient, key):
            setattr(db_patient, key, value)
    
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.delete("/patients/{patient_id}", response_model=dict)
def delete_patient(patient_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    # Try to get by ID first, then by patient_id
    try:
        patient_id_int = int(patient_id)
        db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id_int).first()
    except ValueError:
        db_patient = db.query(PatientModel).filter(PatientModel.patient_id == patient_id).first()
    
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Soft delete - set inactive instead of actually deleting
    db_patient.is_active = False
    db.commit()
    
    return {"message": "Patient deactivated successfully"}
