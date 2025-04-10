
# Import all models here to ensure they are registered with SQLAlchemy
from app.db.models.user import User
from app.db.models.patient import Patient
from app.db.models.analysis import Analysis, AnalysisImage
from app.db.models.report import Report, ReportVersion
from app.db.models.knowledge import KnowledgeArticle, KnowledgeCategory
