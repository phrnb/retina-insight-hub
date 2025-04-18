
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from schemas.schemas import KnowledgeArticle, KnowledgeArticleCreate
from models.models import KnowledgeArticle as KnowledgeArticleModel, User
from db.database import get_db
from auth.jwt import get_current_active_user

router = APIRouter()

@router.get("/knowledge/", response_model=List[KnowledgeArticle])
def get_knowledge_articles(
    category: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(KnowledgeArticleModel)
    
    # Apply filters if provided
    if category and category != "all":
        query = query.filter(KnowledgeArticleModel.category == category)
    
    if search:
        query = query.filter(
            (KnowledgeArticleModel.title.ilike(f"%{search}%")) | 
            (KnowledgeArticleModel.content.ilike(f"%{search}%"))
        )
    
    articles = query.order_by(KnowledgeArticleModel.published_date.desc())\
        .offset(skip).limit(limit).all()
    
    return articles

@router.get("/knowledge/categories", response_model=List[str])
def get_knowledge_categories(db: Session = Depends(get_db)):
    # Get distinct categories
    categories = db.query(KnowledgeArticleModel.category)\
        .distinct()\
        .all()
    
    # Extract category names from result tuples
    category_list = [category[0] for category in categories]
    
    return category_list

@router.get("/knowledge/{article_id}", response_model=KnowledgeArticle)
def get_knowledge_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(KnowledgeArticleModel)\
        .filter(KnowledgeArticleModel.id == article_id)\
        .first()
    
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return article

@router.post("/knowledge/", response_model=KnowledgeArticle)
def create_knowledge_article(
    article: KnowledgeArticleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if user is admin
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403, 
            detail="Only admins can create knowledge articles"
        )
    
    db_article = KnowledgeArticleModel(
        title=article.title,
        content=article.content,
        category=article.category,
        author=article.author
    )
    
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    
    return db_article
