
from typing import Any, List
import uuid
import csv
from io import StringIO
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Response, BackgroundTasks
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models.patient import Patient, GenderEnum
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


@router.post("/import", status_code=status.HTTP_201_CREATED)
async def import_patients(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_or_doctor),
) -> Any:
    """
    Import patients from a CSV file.
    """
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV files are supported",
        )
    
    contents = await file.read()
    try:
        csv_text = contents.decode('utf-8')
        csv_reader = csv.DictReader(StringIO(csv_text))
        
        patients_created = 0
        errors = []
        
        for i, row in enumerate(csv_reader, start=1):
            try:
                # Basic validation
                if not row.get('name') or not row.get('date_of_birth'):
                    errors.append(f"Row {i}: Missing required fields")
                    continue
                
                # Process gender
                gender_str = row.get('gender', '').lower()
                if gender_str == 'male':
                    gender = GenderEnum.MALE
                elif gender_str == 'female':
                    gender = GenderEnum.FEMALE
                else:
                    gender = GenderEnum.OTHER
                
                # Format date
                try:
                    date_of_birth = datetime.strptime(row['date_of_birth'], '%Y-%m-%d').date()
                except ValueError:
                    errors.append(f"Row {i}: Invalid date format, use YYYY-MM-DD")
                    continue
                
                # Generate patient ID
                prefix = "PN-"
                year = "2025"
                sequence_num = db.query(Patient).count() + 1 + patients_created
                patient_id = f"{prefix}{year}-{str(sequence_num).zfill(3)}"
                
                # Create patient
                patient = Patient(
                    patient_id=patient_id,
                    name=row.get('name'),
                    date_of_birth=date_of_birth,
                    gender=gender,
                    contact_phone=row.get('contact_phone', ''),
                    contact_email=row.get('contact_email'),
                    address=row.get('address'),
                    medical_history=row.get('medical_history'),
                    current_diagnosis=row.get('current_diagnosis'),
                    status=row.get('status', 'Stable'),
                    doctor_id=current_user.id,
                )
                
                db.add(patient)
                patients_created += 1
                
            except Exception as e:
                errors.append(f"Row {i}: {str(e)}")
        
        # Commit all valid patients
        db.commit()
        
        return {
            "message": f"Import complete. {patients_created} patients created.",
            "errors": errors if errors else None
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process CSV file: {str(e)}",
        )


@router.get("/export", status_code=status.HTTP_200_OK)
def export_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_or_doctor),
) -> Any:
    """
    Export patients to a CSV file.
    """
    # Get patients based on user role
    query = db.query(Patient)
    if current_user.role.value != "admin":
        query = query.filter(Patient.doctor_id == current_user.id)
    
    patients = query.all()
    
    # Create CSV in memory
    output = StringIO()
    fieldnames = [
        'patient_id', 'name', 'date_of_birth', 'gender', 
        'contact_phone', 'contact_email', 'address', 
        'medical_history', 'current_diagnosis', 'status'
    ]
    
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    
    for patient in patients:
        writer.writerow({
            'patient_id': patient.patient_id,
            'name': patient.name,
            'date_of_birth': patient.date_of_birth.isoformat(),
            'gender': patient.gender.value,
            'contact_phone': patient.contact_phone,
            'contact_email': patient.contact_email or '',
            'address': patient.address or '',
            'medical_history': patient.medical_history or '',
            'current_diagnosis': patient.current_diagnosis or '',
            'status': patient.status,
        })
    
    # Generate response with CSV file
    response = Response(
        content=output.getvalue(),
        media_type="text/csv"
    )
    response.headers["Content-Disposition"] = f"attachment;filename=patients_export_{datetime.now().strftime('%Y%m%d')}.csv"
    
    return response


@router.get("/stats", status_code=status.HTTP_200_OK)
def get_patient_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get statistics about patients.
    """
    # Base query
    query = db.query(Patient)
    if current_user.role.value != "admin":
        query = query.filter(Patient.doctor_id == current_user.id)
    
    # Total patients
    total_patients = query.count()
    
    # Status breakdown
    stable_count = query.filter(Patient.status == "Stable").count()
    improving_count = query.filter(Patient.status == "Improving").count()
    deteriorating_count = query.filter(Patient.status == "Deteriorating").count()
    critical_count = query.filter(Patient.status == "Critical").count()
    
    # Gender breakdown
    male_count = query.filter(Patient.gender == GenderEnum.MALE).count()
    female_count = query.filter(Patient.gender == GenderEnum.FEMALE).count()
    other_count = query.filter(Patient.gender == GenderEnum.OTHER).count()
    
    return {
        "total_patients": total_patients,
        "status": {
            "stable": stable_count,
            "improving": improving_count,
            "deteriorating": deteriorating_count,
            "critical": critical_count
        },
        "gender": {
            "male": male_count,
            "female": female_count,
            "other": other_count
        }
    }

