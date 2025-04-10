
from typing import Any, List
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from app.db.database import get_db
from app.db.models.report import Report, ReportVersion, ReportType
from app.db.models.patient import Patient
from app.db.models.analysis import Analysis
from app.schemas.report import Report as ReportSchema, ReportCreate, ReportUpdate, ReportVersion as ReportVersionSchema
from app.api.deps import get_current_user, get_admin_or_doctor
from app.db.models.user import User

router = APIRouter()


@router.get("/", response_model=List[ReportSchema])
def get_all_reports(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    report_type: str = None,
    patient_id: str = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all reports with optional filtering.
    """
    query = db.query(Report)
    
    # Filter by report type if provided
    if report_type:
        try:
            type_enum = ReportType(report_type)
            query = query.filter(Report.report_type == type_enum)
        except ValueError:
            pass  # Ignore invalid report type
    
    # Filter by patient_id if provided
    if patient_id:
        patient = None
        
        # Try to find patient by external ID or internal ID
        if patient_id.isdigit():
            patient = db.query(Patient).filter(Patient.id == int(patient_id)).first()
        else:
            patient = db.query(Patient).filter(Patient.patient_id == patient_id).first()
        
        if patient:
            query = query.filter(Report.patient_id == patient.id)
        else:
            # Return empty list if patient not found
            return []
    
    reports = query.offset(skip).limit(limit).all()
    return reports


@router.post("/", response_model=ReportSchema)
def create_report(
    *,
    db: Session = Depends(get_db),
    report_in: ReportCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new report.
    """
    # Check if patient exists
    patient = db.query(Patient).filter(Patient.id == report_in.patient_id).first()
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    
    # Check if analysis exists if provided
    if report_in.analysis_id:
        analysis = db.query(Analysis).filter(Analysis.id == report_in.analysis_id).first()
        if not analysis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Analysis not found",
            )
    
    # Generate a report ID
    prefix = "RPT-"
    year = "2025"
    sequence_num = db.query(Report).count() + 1
    report_id = f"{prefix}{year}-{str(sequence_num).zfill(3)}"
    
    # Create report
    db_report = Report(
        report_id=report_id,
        patient_id=report_in.patient_id,
        analysis_id=report_in.analysis_id,
        author_id=current_user.id,
        report_type=report_in.report_type,
        title=report_in.title,
    )
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    # Create initial version
    db_version = ReportVersion(
        report_id=db_report.id,
        version_number=1,
        content=report_in.initial_content,
        created_by_id=current_user.id,
        change_summary="Initial version",
    )
    
    db.add(db_version)
    db.commit()
    db.refresh(db_version)
    
    # Refresh report to include the version
    db.refresh(db_report)
    
    return db_report


@router.get("/{report_id}", response_model=ReportSchema)
def get_report(
    report_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get report by ID.
    """
    # Look up by database ID or external report ID
    report = None
    
    if report_id.isdigit():
        report = db.query(Report).filter(Report.id == int(report_id)).first()
    else:
        report = db.query(Report).filter(Report.report_id == report_id).first()
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    
    return report


@router.put("/{report_id}", response_model=ReportSchema)
def update_report(
    *,
    db: Session = Depends(get_db),
    report_id: str,
    report_in: ReportUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update report information.
    """
    # Look up by database ID or external report ID
    report = None
    
    if report_id.isdigit():
        report = db.query(Report).filter(Report.id == int(report_id)).first()
    else:
        report = db.query(Report).filter(Report.report_id == report_id).first()
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    
    # Update attributes that were provided
    for field, value in report_in.dict(exclude_unset=True).items():
        setattr(report, field, value)
    
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.post("/{report_id}/versions", response_model=ReportVersionSchema)
def create_report_version(
    *,
    db: Session = Depends(get_db),
    report_id: str,
    content: str,
    change_summary: str = "Updated report",
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create a new version of a report.
    """
    # Look up report
    report = None
    
    if report_id.isdigit():
        report = db.query(Report).filter(Report.id == int(report_id)).first()
    else:
        report = db.query(Report).filter(Report.report_id == report_id).first()
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    
    # Get latest version number
    latest_version = db.query(func.max(ReportVersion.version_number)).filter(
        ReportVersion.report_id == report.id
    ).scalar() or 0
    
    # Create new version
    db_version = ReportVersion(
        report_id=report.id,
        version_number=latest_version + 1,
        content=content,
        created_by_id=current_user.id,
        change_summary=change_summary,
    )
    
    db.add(db_version)
    db.commit()
    db.refresh(db_version)
    
    return db_version


@router.get("/{report_id}/versions", response_model=List[ReportVersionSchema])
def get_report_versions(
    report_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all versions of a report.
    """
    # Look up report
    report = None
    
    if report_id.isdigit():
        report = db.query(Report).filter(Report.id == int(report_id)).first()
    else:
        report = db.query(Report).filter(Report.report_id == report_id).first()
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    
    # Get versions
    versions = db.query(ReportVersion).filter(
        ReportVersion.report_id == report.id
    ).order_by(ReportVersion.version_number.desc()).all()
    
    return versions


@router.get("/{report_id}/versions/{version_number}", response_model=ReportVersionSchema)
def get_report_version(
    report_id: str,
    version_number: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get a specific version of a report.
    """
    # Look up report
    report = None
    
    if report_id.isdigit():
        report = db.query(Report).filter(Report.id == int(report_id)).first()
    else:
        report = db.query(Report).filter(Report.report_id == report_id).first()
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    
    # Get version
    version = db.query(ReportVersion).filter(
        ReportVersion.report_id == report.id,
        ReportVersion.version_number == version_number
    ).first()
    
    if not version:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report version not found",
        )
    
    return version
