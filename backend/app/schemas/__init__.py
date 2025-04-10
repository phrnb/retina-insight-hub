
# Import schemas for easy access
from app.schemas.user import User, UserCreate, UserUpdate
from app.schemas.token import Token, TokenPayload
from app.schemas.patient import Patient, PatientCreate, PatientUpdate
from app.schemas.analysis import Analysis, AnalysisCreate, AnalysisUpdate, AnalysisImage
from app.schemas.report import Report, ReportCreate, ReportUpdate, ReportVersion
from app.schemas.knowledge import KnowledgeArticle, KnowledgeCategory
