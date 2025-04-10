
# RetinaScan API Backend

This is the FastAPI backend for the RetinaScan ophthalmology application.

## Features

- User authentication with JWT tokens
- Role-based access control (admin, doctor, technician, researcher)
- Patient management
- Analysis and diagnosis tools
- Reports generation and versioning
- Knowledge base for ophthalmology resources

## Tech Stack

- Python 3.11+
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Alembic (migrations)
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development)

### Running with Docker

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values
3. Run the application:

```bash
docker-compose up -d
```

The API will be available at http://localhost:8000

### API Documentation

Once the application is running, you can access:

- Swagger UI: http://localhost:8000/docs
- OpenAPI JSON: http://localhost:8000/openapi.json

## Development

### Setup Local Environment

```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start the development server
uvicorn app.main:app --reload
```

### Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head
```

## Project Structure

```
backend/
├── alembic/               # Database migrations
├── app/                   # Main application
│   ├── api/               # API endpoints
│   │   ├── deps.py        # API dependencies (auth, etc.)
│   │   └── routes/        # API route handlers
│   ├── core/              # Core functionality
│   │   ├── config.py      # Application configuration
│   │   └── security.py    # Security utilities
│   ├── db/                # Database
│   │   ├── database.py    # Database configuration
│   │   └── models/        # SQLAlchemy models
│   ├── schemas/           # Pydantic schemas
│   └── main.py            # Application entry point
├── uploads/               # Uploaded files
├── .env                   # Environment variables
├── .env.example           # Example environment variables
├── alembic.ini            # Alembic configuration
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker configuration
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation
```
