
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from schemas.schemas import Notification, NotificationCreate
from models.models import Notification as NotificationModel, User
from db.database import get_db
from auth.jwt import get_current_active_user

router = APIRouter()

@router.get("/notifications/", response_model=List[Notification])
def get_user_notifications(
    filter: Optional[str] = "all", 
    skip: int = 0, 
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = db.query(NotificationModel).filter(NotificationModel.user_id == current_user.id)
    
    # Apply filter
    if filter == "unread":
        query = query.filter(NotificationModel.is_read == False)
    elif filter == "read":
        query = query.filter(NotificationModel.is_read == True)
    
    notifications = query.order_by(NotificationModel.created_at.desc())\
        .offset(skip).limit(limit).all()
    
    return notifications

@router.post("/notifications/", response_model=Notification)
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_notification = NotificationModel(
        user_id=notification.user_id,
        title=notification.title,
        content=notification.content,
        notification_type=notification.notification_type
    )
    
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    
    return db_notification

@router.put("/notifications/{notification_id}/read", response_model=Notification)
def mark_notification_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_notification = db.query(NotificationModel)\
        .filter(NotificationModel.id == notification_id)\
        .filter(NotificationModel.user_id == current_user.id)\
        .first()
    
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    db_notification.is_read = True
    db.commit()
    db.refresh(db_notification)
    
    return db_notification

@router.put("/notifications/read-all", response_model=dict)
def mark_all_notifications_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db.query(NotificationModel)\
        .filter(NotificationModel.user_id == current_user.id)\
        .filter(NotificationModel.is_read == False)\
        .update({"is_read": True})
    
    db.commit()
    
    return {"message": "All notifications marked as read"}
