
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class KnowledgeCategoryBase(BaseModel):
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
    category_id: int
    is_published: bool = True


class KnowledgeArticleCreate(KnowledgeArticleBase):
    pass


class KnowledgeArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    summary: Optional[str] = None
    category_id: Optional[int] = None
    is_published: Optional[bool] = None


class KnowledgeArticle(KnowledgeArticleBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
