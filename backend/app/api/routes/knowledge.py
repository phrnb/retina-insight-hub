
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models.knowledge import KnowledgeArticle, KnowledgeCategory
from app.schemas.knowledge import (
    KnowledgeArticle as KnowledgeArticleSchema,
    KnowledgeCategory as KnowledgeCategorySchema,
    KnowledgeArticleCreate,
    KnowledgeArticleUpdate,
    KnowledgeCategoryCreate,
)
from app.api.deps import get_current_user, get_admin_user
from app.db.models.user import User

router = APIRouter()


@router.get("/categories", response_model=List[KnowledgeCategorySchema])
def get_all_categories(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all knowledge categories.
    """
    categories = db.query(KnowledgeCategory).offset(skip).limit(limit).all()
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
    # Check if category with this ID exists
    category = db.query(KnowledgeCategory).filter(KnowledgeCategory.category_id == category_in.category_id).first()
    if category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A category with this ID already exists",
        )
    
    # Create category
    db_category = KnowledgeCategory(
        category_id=category_in.category_id,
        name=category_in.name,
        description=category_in.description,
        icon=category_in.icon,
    )
    
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    
    return db_category


@router.get("/articles", response_model=List[KnowledgeArticleSchema])
def get_all_articles(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get all knowledge articles with optional category filter.
    """
    query = db.query(KnowledgeArticle)
    
    # Filter by category if provided
    if category and category != "all":
        category_obj = db.query(KnowledgeCategory).filter(KnowledgeCategory.category_id == category).first()
        if category_obj:
            query = query.join(
                KnowledgeArticle.categories
            ).filter(KnowledgeCategory.id == category_obj.id)
        else:
            return []  # Return empty list if category not found
    
    articles = query.offset(skip).limit(limit).all()
    return articles


@router.post("/articles", response_model=KnowledgeArticleSchema)
def create_article(
    *,
    db: Session = Depends(get_db),
    article_in: KnowledgeArticleCreate,
    current_user: User = Depends(get_admin_user),
) -> Any:
    """
    Create new knowledge article. Admin only.
    """
    # Check if all categories exist
    categories = []
    for category_id in article_in.category_ids:
        category = db.query(KnowledgeCategory).filter(KnowledgeCategory.id == category_id).first()
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with ID {category_id} not found",
            )
        categories.append(category)
    
    # Create article
    db_article = KnowledgeArticle(
        title=article_in.title,
        content=article_in.content,
        summary=article_in.summary,
        author=article_in.author,
        is_featured=article_in.is_featured,
        thumbnail_url=article_in.thumbnail_url,
        read_time_minutes=article_in.read_time_minutes,
    )
    
    # Add categories
    db_article.categories = categories
    
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
    Get article by ID.
    """
    article = db.query(KnowledgeArticle).filter(KnowledgeArticle.id == article_id).first()
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
    current_user: User = Depends(get_admin_user),
) -> Any:
    """
    Update article. Admin only.
    """
    article = db.query(KnowledgeArticle).filter(KnowledgeArticle.id == article_id).first()
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )
    
    # Update categories if provided
    if article_in.category_ids is not None:
        categories = []
        for category_id in article_in.category_ids:
            category = db.query(KnowledgeCategory).filter(KnowledgeCategory.id == category_id).first()
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Category with ID {category_id} not found",
                )
            categories.append(category)
        article.categories = categories
    
    # Update other attributes that were provided
    update_data = article_in.dict(exclude_unset=True, exclude={"category_ids"})
    for field, value in update_data.items():
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
    Delete article. Admin only.
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


@router.get("/articles/featured", response_model=List[KnowledgeArticleSchema])
def get_featured_articles(
    db: Session = Depends(get_db),
    limit: int = 5,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get featured knowledge articles.
    """
    articles = db.query(KnowledgeArticle).filter(KnowledgeArticle.is_featured == True).limit(limit).all()
    return articles


@router.get("/categories/{category_id}", response_model=KnowledgeCategorySchema)
def get_category(
    category_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get category by ID.
    """
    # Try to find by numeric ID first
    if category_id.isdigit():
        category = db.query(KnowledgeCategory).filter(KnowledgeCategory.id == int(category_id)).first()
    else:
        category = db.query(KnowledgeCategory).filter(KnowledgeCategory.category_id == category_id).first()
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )
    
    return category
