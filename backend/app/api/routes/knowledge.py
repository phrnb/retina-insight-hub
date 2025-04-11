
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models.knowledge import KnowledgeArticle, KnowledgeCategory
from app.schemas.knowledge import (
    KnowledgeArticle as KnowledgeArticleSchema,
    KnowledgeArticleCreate,
    KnowledgeArticleUpdate,
    KnowledgeCategory as KnowledgeCategorySchema,
    KnowledgeCategoryCreate,
)
from app.api.deps import get_current_user, get_admin_user
from app.db.models.user import User

router = APIRouter()


# Knowledge Categories
@router.get("/categories", response_model=List[KnowledgeCategorySchema])
def get_all_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all knowledge categories.
    """
    categories = db.query(KnowledgeCategory).all()
    return categories


@router.post("/categories", response_model=KnowledgeCategorySchema)
def create_category(
    *,
    db: Session = Depends(get_db),
    category_in: KnowledgeCategoryCreate,
    current_user: User = Depends(get_admin_user),
) -> Any:
    """
    Create new knowledge category. Admin only.
    """
    # Check if category already exists
    db_category = db.query(KnowledgeCategory).filter(
        KnowledgeCategory.name == category_in.name
    ).first()
    
    if db_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name already exists",
        )
    
    # Create new category
    db_category = KnowledgeCategory(**category_in.dict())
    
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    
    return db_category


# Knowledge Articles
@router.get("/articles", response_model=List[KnowledgeArticleSchema])
def get_all_articles(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category_id: int = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all knowledge articles with optional filtering.
    """
    query = db.query(KnowledgeArticle).filter(KnowledgeArticle.is_published == True)
    
    # Filter by category if provided
    if category_id:
        query = query.filter(KnowledgeArticle.category_id == category_id)
    
    articles = query.offset(skip).limit(limit).all()
    return articles


@router.post("/articles", response_model=KnowledgeArticleSchema)
def create_article(
    *,
    db: Session = Depends(get_db),
    article_in: KnowledgeArticleCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new knowledge article.
    """
    # Check if category exists
    category = db.query(KnowledgeCategory).filter(
        KnowledgeCategory.id == article_in.category_id
    ).first()
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )
    
    # Create new article
    db_article = KnowledgeArticle(**article_in.dict(), author_id=current_user.id)
    
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    
    return db_article


@router.get("/articles/{article_id}", response_model=KnowledgeArticleSchema)
def get_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get a specific knowledge article.
    """
    article = db.query(KnowledgeArticle).filter(
        KnowledgeArticle.id == article_id,
        KnowledgeArticle.is_published == True
    ).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )
    
    return article


@router.put("/articles/{article_id}", response_model=KnowledgeArticleSchema)
def update_article(
    *,
    db: Session = Depends(get_db),
    article_id: int,
    article_in: KnowledgeArticleUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a knowledge article.
    """
    article = db.query(KnowledgeArticle).filter(KnowledgeArticle.id == article_id).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )
    
    # Check if user has permission (admin or author)
    if current_user.role.value != "admin" and article.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    # Check if category exists if provided
    if article_in.category_id:
        category = db.query(KnowledgeCategory).filter(
            KnowledgeCategory.id == article_in.category_id
        ).first()
        
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found",
            )
    
    # Update article
    for field, value in article_in.dict(exclude_unset=True).items():
        setattr(article, field, value)
    
    db.add(article)
    db.commit()
    db.refresh(article)
    
    return article


@router.delete("/articles/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(
    *,
    db: Session = Depends(get_db),
    article_id: int,
    current_user: User = Depends(get_admin_user),
) -> Any:
    """
    Delete a knowledge article. Admin only.
    """
    article = db.query(KnowledgeArticle).filter(KnowledgeArticle.id == article_id).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )
    
    db.delete(article)
    db.commit()
    
    return None
