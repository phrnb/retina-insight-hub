
from typing import Any, List
import uuid
import os
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse

from app.db.database import get_db
from app.db.models.analysis import Analysis, AnalysisImage, AnalysisStatus, ImageType
from app.db.models.patient import Patient
from app.schemas.analysis import Analysis as AnalysisSchema
from app.schemas.analysis import AnalysisCreate, AnalysisUpdate, AnalysisImage as AnalysisImageSchema
from app.api.deps import get_current_user, get_admin_or_doctor
from app.db.models.user import User
from app.core.config import settings

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/", response_model=List[AnalysisSchema])
def get_all_analyses(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    patient_id: str = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all analyses with optional filtering.
    """
    query = db.query(Analysis)
    
    # Filter by status if provided
    if status:
        try:
            status_enum = AnalysisStatus(status)
            query = query.filter(Analysis.status == status_enum)
        except ValueError:
            pass  # Ignore invalid status
    
    # Filter by patient_id if provided
    if patient_id:
        patient = None
        
        # Try to find patient by external ID or internal ID
        if patient_id.isdigit():
            patient = db.query(Patient).filter(Patient.id == int(patient_id)).first()
        else:
            patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
        
        if patient:
            query = query.filter(Analysis.patient_id == patient.id)
        else:
            # Return empty list if patient not found
            return []
    
    analyses = query.offset(skip).limit(limit).all()
    return analyses


@router.post("/", response_model=AnalysisSchema)
def create_analysis(
    *,
    db: Session = Depends(get_db),
    analysis_in: AnalysisCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new analysis record.
    """
    # Check if patient exists
    patient = db.query(Patient).filter(Patient.id == analysis_in.patient_id).first()
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    
    # Generate an analysis ID
    prefix = "RES-"
    year = "2025"
    sequence_num = db.query(Analysis).count() + 1
    analysis_id = f"{prefix}{year}-{str(sequence_num).zfill(3)}"
    
    # Create analysis
    db_analysis = Analysis(
        analysis_id=analysis_id,
        patient_id=analysis_in.patient_id,
        status=analysis_in.status,
        diagnosis=analysis_in.diagnosis,
        confidence_score=analysis_in.confidence_score,
        severity=analysis_in.severity,
        doctor_notes=analysis_in.doctor_notes,
        created_by_id=current_user.id,
    )
    
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return db_analysis


@router.get("/{analysis_id}", response_model=AnalysisSchema)
def get_analysis(
    analysis_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get analysis by ID.
    """
    # Look up by database ID or external analysis ID
    analysis = None
    
    if analysis_id.isdigit():
        analysis = db.query(Analysis).filter(Analysis.id == int(analysis_id)).first()
    else:
        analysis = db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
    
    return analysis


@router.put("/{analysis_id}", response_model=AnalysisSchema)
def update_analysis(
    *,
    db: Session = Depends(get_db),
    analysis_id: str,
    analysis_in: AnalysisUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update analysis information.
    """
    # Look up by database ID or external analysis ID
    analysis = None
    
    if analysis_id.isdigit():
        analysis = db.query(Analysis).filter(Analysis.id == int(analysis_id)).first()
    else:
        analysis = db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
    
    # Update attributes that were provided
    for field, value in analysis_in.dict(exclude_unset=True).items():
        setattr(analysis, field, value)
    
    # If status changed to completed, set completed_at
    if analysis_in.status == AnalysisStatus.COMPLETED:
        analysis.completed_at = datetime.utcnow()
    
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis


@router.post("/{analysis_id}/images", response_model=AnalysisImageSchema)
async def upload_analysis_image(
    analysis_id: str,
    image_type: ImageType = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Upload image for analysis.
    """
    # Look up analysis
    analysis = None
    
    if analysis_id.isdigit():
        analysis = db.query(Analysis).filter(Analysis.id == int(analysis_id)).first()
    else:
        analysis = db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
    
    # Create directory for this analysis if it doesn't exist
    analysis_dir = os.path.join(UPLOAD_DIR, f"analysis_{analysis.id}")
    os.makedirs(analysis_dir, exist_ok=True)
    
    # Save the image
    file_extension = os.path.splitext(image.filename)[1]
    file_name = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(analysis_dir, file_name)
    
    with open(file_path, "wb") as f:
        content = await image.read()
        f.write(content)
    
    # Create image record
    db_image = AnalysisImage(
        analysis_id=analysis.id,
        image_path=file_path,
        image_type=image_type,
    )
    
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    
    return db_image


@router.get("/images/{image_id}")
async def get_analysis_image(
    image_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get analysis image by ID.
    """
    # Look up image
    image = db.query(AnalysisImage).filter(AnalysisImage.id == image_id).first()
    
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found",
        )
    
    # Return the file
    if os.path.exists(image.image_path):
        return FileResponse(image.image_path)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image file not found",
        )


@router.post("/{analysis_id}/heatmap/{image_id}", response_model=AnalysisImageSchema)
async def upload_analysis_heatmap(
    analysis_id: str,
    image_id: int,
    heatmap: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Upload heatmap overlay for an analysis image.
    """
    # Look up analysis
    analysis = None
    
    if analysis_id.isdigit():
        analysis = db.query(Analysis).filter(Analysis.id == int(analysis_id)).first()
    else:
        analysis = db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
    
    # Look up image
    image = db.query(AnalysisImage).filter(
        AnalysisImage.id == image_id,
        AnalysisImage.analysis_id == analysis.id
    ).first()
    
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found",
        )
    
    # Create directory for this analysis if it doesn't exist
    analysis_dir = os.path.join(UPLOAD_DIR, f"analysis_{analysis.id}")
    os.makedirs(analysis_dir, exist_ok=True)
    
    # Save the heatmap
    file_extension = os.path.splitext(heatmap.filename)[1]
    file_name = f"heatmap_{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(analysis_dir, file_name)
    
    with open(file_path, "wb") as f:
        content = await heatmap.read()
        f.write(content)
    
    # Update image record
    image.heatmap_path = file_path
    
    db.add(image)
    db.commit()
    db.refresh(image)
    
    return image
