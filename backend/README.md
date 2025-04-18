
# Medical System Backend

This is the FastAPI backend for the medical system application.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a PostgreSQL database named `medical_system`

5. Copy `.env.example` to `.env` and update the values:
   ```
   cp .env.example .env
   ```

6. Run the development server:
   ```
   python main.py
   ```

The API will be available at http://localhost:8000

API documentation will be available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
