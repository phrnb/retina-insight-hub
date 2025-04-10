
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class KnowledgeCategoryBase(BaseModel):
    category_id: str
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None


class KnowledgeCategoryCreate(KnowledgeCategoryBase):
    pass


class KnowledgeCategory(KnowledgeCategoryBase):
    id: int

    class Config:
        orm_mode = True


class KnowledgeArticleBase(BaseModel):
    title: str
    content: str
    summary: Optional[str] = None
    author: Optional[str] = None
    is_featured: bool = False
    thumbnail_url: Optional[str] = None
    read_time_minutes: Optional[int] = None


class KnowledgeArticleCreate(KnowledgeArticleBase):
    category_ids: List[int]


class KnowledgeArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    summary: Optional[str] = None
    author: Optional[str] = None
    is_featured: Optional[bool] = None
    thumbnail_url: Optional[str] = None
    read_time_minutes: Optional[int] = None
    category_ids: Optional[List[int]] = None


class KnowledgeArticle(KnowledgeArticleBase):
    id: int
    published_date: datetime
    updated_date: datetime
    categories: List[KnowledgeCategory] = []

    class Config:
        orm_mode = True
