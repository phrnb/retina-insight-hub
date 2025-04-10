
FROM python:3.11-slim

WORKDIR /app

# Set environment variables
# Use Python unbuffered mode for better logs in Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose the port
EXPOSE 8000

# Using CMD array syntax which works well on both Windows and Linux
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
