
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from schemas.schemas import Report, ReportCreate, ReportVersion, ReportVersionCreate
from models.models import Report as ReportModel, ReportVersion as ReportVersionModel, User, Patient as PatientModel
from db.database import get_db
from auth.jwt import get_current_active_user

router = APIRouter()

@router.post("/reports/", response_model=Report)
def create_report(
    report: ReportCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    # Check if patient exists
    db_patient = db.query(PatientModel).filter(PatientModel.id == report.patient_id).first()
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Generate report_id if not provided
    if not getattr(report, "report_id", None):
        latest_report = db.query(ReportModel).order_by(ReportModel.id.desc()).first()
        report_number = 1
        if latest_report and latest_report.report_id and latest_report.report_id.startswith("RPT-"):
            try:
                report_number = int(latest_report.report_id.split("-")[-1]) + 1
            except ValueError:
                report_number = 1
        report_id = f"RPT-{datetime.now().year}-{report_number:03d}"
    else:
        report_id = report.report_id
    
    # Create report
    db_report = ReportModel(
        report_id=report_id,
        type=report.type,
        patient_id=report.patient_id,
        analysis_id=report.analysis_id,
        content=report.content,
        created_by_id=current_user.id
    )
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    # Create initial version
    db_version = ReportVersionModel(
        report_id=db_report.id,
        content=report.content,
        version_number=1,
        changes_description="Initial report creation"
    )
    
    db.add(db_version)
    db.commit()
    
    return db_report

@router.get("/reports/", response_model=List[Report])
def get_reports(
    skip: int = 0, 
    limit: int = 100,
    report_type: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = db.query(ReportModel)
    
    # Apply filter if provided
    if report_type:
        query = query.filter(ReportModel.type == report_type)
    
    reports = query.order_by(ReportModel.generated_date.desc())\
        .offset(skip).limit(limit).all()
    
    return reports

@router.get("/reports/{report_id}", response_model=Report)
def get_report(
    report_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Try to get by ID first, then by report_id
    try:
        report_id_int = int(report_id)
        db_report = db.query(ReportModel).filter(ReportModel.id == report_id_int).first()
    except ValueError:
        db_report = db.query(ReportModel).filter(ReportModel.report_id == report_id).first()
    
    if db_report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return db_report

@router.put("/reports/{report_id}", response_model=Report)
def update_report(
    report_id: str, 
    report_data: ReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Try to get by ID first, then by report_id
    try:
        report_id_int = int(report_id)
        db_report = db.query(ReportModel).filter(ReportModel.id == report_id_int).first()
    except ValueError:
        db_report = db.query(ReportModel).filter(ReportModel.report_id == report_id).first()
    
    if db_report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Update report
    for key, value in report_data.dict().items():
        if key != "report_id" and hasattr(db_report, key):
            setattr(db_report, key, value)
    
    # Get latest version number
    latest_version = db.query(ReportVersionModel)\
        .filter(ReportVersionModel.report_id == db_report.id)\
        .order_by(ReportVersionModel.version_number.desc())\
        .first()
    
    next_version_number = 1
    if latest_version:
        next_version_number = latest_version.version_number + 1
    
    # Create new version
    db_version = ReportVersionModel(
        report_id=db_report.id,
        content=report_data.content,
        version_number=next_version_number,
        changes_description=f"Update by {current_user.first_name} {current_user.last_name}"
    )
    
    db.add(db_version)
    db.commit()
    db.refresh(db_report)
    
    return db_report

@router.get("/reports/{report_id}/versions", response_model=List[ReportVersion])
def get_report_versions(
    report_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Try to get report by ID first, then by report_id
    try:
        report_id_int = int(report_id)
        db_report = db.query(ReportModel).filter(ReportModel.id == report_id_int).first()
    except ValueError:
        db_report = db.query(ReportModel).filter(ReportModel.report_id == report_id).first()
    
    if db_report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    
    versions = db.query(ReportVersionModel)\
        .filter(ReportVersionModel.report_id == db_report.id)\
        .order_by(ReportVersionModel.version_number.desc())\
        .all()
    
    return versions
