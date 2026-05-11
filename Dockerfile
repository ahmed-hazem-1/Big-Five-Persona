# Stage 1: Build React frontend
FROM node:20-slim AS build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Ensure questions are generated
RUN npm run generate:questions
RUN npm run build

# Stage 2: Setup Python FastAPI backend
FROM python:3.9-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY Models/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY Models/api/main.py ./main.py
COPY questions.csv ./questions.csv

# Copy model artifacts
COPY Models ./Models

# Copy built frontend from Stage 1
COPY --from=build-frontend /app/dist ./static

# Expose the port HF Spaces expects
EXPOSE 7860

# Run the application
CMD ["python", "main.py"]
