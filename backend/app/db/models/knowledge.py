
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Table, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base

# Association table for many-to-many relationship between articles and categories
article_categories = Table(
    "article_categories",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("knowledge_articles.id")),
    Column("category_id", Integer, ForeignKey("knowledge_categories.id"))
)


class KnowledgeCategory(Base):
    __tablename__ = "knowledge_categories"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(String, unique=True)  # e.g., "glaucoma", "retinopathy"
    name = Column(String)
    description = Column(Text, nullable=True)
    icon = Column(String, nullable=True)  # Icon name for UI

    # Relationships
    articles = relationship(
        "KnowledgeArticle", 
        secondary=article_categories,
        back_populates="categories"
    )


class KnowledgeArticle(Base):
    __tablename__ = "knowledge_articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    summary = Column(Text, nullable=True)
    author = Column(String, nullable=True)
    published_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    is_featured = Column(Boolean, default=False)
    thumbnail_url = Column(String, nullable=True)
    read_time_minutes = Column(Integer, nullable=True)

    # Relationships
    categories = relationship(
        "KnowledgeCategory", 
        secondary=article_categories,
        back_populates="articles"
    )
