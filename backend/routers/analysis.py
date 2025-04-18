
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from datetime import datetime
import random
import shutil
import uuid

from schemas.schemas import Analysis, AnalysisCreate
from models.models import Analysis as AnalysisModel, Image as ImageModel, User, Patient as PatientModel
from db.database import get_db
from auth.jwt import get_current_active_user

router = APIRouter()

# Directory for storing images
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/analysis/upload", response_model=dict)
async def upload_image(
    file: UploadFile = File(...),
    patient_id: int = Form(...),
    image_type: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if patient exists
    db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id).first()
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Create directory for patient if it doesn't exist
    patient_dir = os.path.join(UPLOAD_DIR, f"patient_{patient_id}")
    os.makedirs(patient_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(patient_dir, unique_filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create image record in database
    db_image = ImageModel(
        filename=file.filename,
        file_path=file_path,
        image_type=image_type,
        patient_id=patient_id
    )
    
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    
    # Create analysis record
    db_analysis = AnalysisModel(
        image_id=db_image.id,
        patient_id=patient_id,
        status="pending"
    )
    
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return {
        "image_id": db_image.id,
        "analysis_id": db_analysis.id,
        "status": "upload_successful",
        "message": "Image uploaded and analysis job created"
    }

@router.get("/analysis/{analysis_id}", response_model=Analysis)
def get_analysis(analysis_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_analysis = db.query(AnalysisModel).filter(AnalysisModel.id == analysis_id).first()
    if db_analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return db_analysis

@router.post("/analysis/process/{analysis_id}", response_model=Analysis)
def process_analysis(analysis_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_analysis = db.query(AnalysisModel).filter(AnalysisModel.id == analysis_id).first()
    if db_analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    # Simulate AI processing
    # In a real app, this would trigger an async task to process the image
    db_analysis.status = "processing"
    db.commit()
    
    # For demo purposes, simulate AI results after "processing"
    # In production, you'd use a real ML model
    diagnoses = [
        "Diabetic Retinopathy",
        "Age-related Macular Degeneration",
        "Glaucoma",
        "Cataracts",
        "Normal"
    ]
    
    # Simulate processing delay and results generation
    db_analysis.status = "complete"
    db_analysis.ai_diagnosis = random.choice(diagnoses)
    db_analysis.confidence = random.uniform(85.0, 99.0)
    db_analysis.analysis_date = datetime.now()
    
    db.commit()
    db.refresh(db_analysis)
    
    return db_analysis

@router.put("/analysis/{analysis_id}/diagnosis", response_model=Analysis)
def update_doctor_diagnosis(
    analysis_id: int,
    doctor_diagnosis: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_analysis = db.query(AnalysisModel).filter(AnalysisModel.id == analysis_id).first()
    if db_analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    db_analysis.doctor_diagnosis = doctor_diagnosis
    db.commit()
    db.refresh(db_analysis)
    
    return db_analysis

@router.get("/analysis/patient/{patient_id}", response_model=List[Analysis])
def get_patient_analyses(
    patient_id: int, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    analyses = db.query(AnalysisModel).filter(AnalysisModel.patient_id == patient_id)\
        .order_by(AnalysisModel.analysis_date.desc())\
        .offset(skip).limit(limit).all()
    
    return analyses
