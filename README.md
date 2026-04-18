# Taskora — Premium Task Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-1.5_Flash-4285F4)](https://deepmind.google/technologies/gemini/)

Taskora is a high-fidelity, premium task management application meticulously designed for Weboin Technologies. It combines a state-of-the-art cinematic landing page with a powerful dark-mode dashboard, CSS-only visual analytics, and an AI-driven voice task creation pipeline.

## 🌟 Key Features

*   **Cinematic Landing Experience**: High-performance animated 3D-effect waves, dynamic cursor typography (`VariableProximity`), and dark-mode optimization.
*   **Split-Screen Authentication**: Dynamic, smooth, layout-shifting Login and Register flows built for immediate impact.
*   **High-End Dashboard**: A robust timeline-driven `WeekCalendar`, custom `RightPanel` for urgent cards, and an immersive `TourTooltip` onboarding flow.
*   **Native Voice AI**: Integrated `WebSpeech API` wired seamlessly into **Gemini 1.5 Flash** for highly accurate text-to-JSON task parsing. No more typing out long task cards.
*   **CSS-Only Analytics**: Advanced gauges, donuts, and timeline charts constructed *without* external charting libraries for lightning-fast performance.
*   **Demo Mode Guard**: A dedicated `demo@weboin.com` configuration that allows exploration without corrupting primary data.

## 🛠 Tech Stack

### Frontend (Next.js 14 App Router)
*   **Framework**: Next.js 14 (React)
*   **Styling**: Tailwind CSS + Custom Vanilla CSS (for ultra-specific aesthetics)
*   **Animations**: Framer Motion
*   **Icons**: `lucide-react`
*   **Data Fetching**: `axios`

### Backend (FastAPI)
*   **Framework**: FastAPI
*   **Database ORM**: SQLAlchemy 2.0 (Async) + `asyncpg`
*   **Database**: Supabase PostgreSQL
*   **Authentication**: JWT (`python-jose`, `passlib[bcrypt]`, `bcrypt`)
*   **AI Integration**: `google-generativeai` (Gemini 1.5 Flash)
*   **Testing**: Pytest + `pytest-asyncio`

## 🚀 Local Development Setup

### 1. Prerequisites
*   Node.js 18+
*   Python 3.11+
*   PostgreSQL database (Supabase recommended)
*   Google Gemini API Key

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate.ps1
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt

# Configure env
cp .env.example .env
# Edit .env with your DATABASE_URL, SECRET_KEY, and GEMINI_API_KEY
```

Run database migrations/setup:
The database tables are automatically verified/created on app startup via the FastAPI `lifespan` event.

Run the development server:
```bash
uvicorn app.main:app --reload --port 8000
```
API Docs available at: `http://localhost:8000/api/v1/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Configure env
cp .env.local.example .env.local
```

Run the frontend server:
```bash
npm run dev
```
Access the app at: `http://localhost:3000`

### 4. Running the Test Suite (Backend)
The backend uses a fully isolated in-memory SQLite database (`aiosqlite`) for tests, ensuring your Supabase data is never touched.
```bash
cd backend
pytest tests/ -v --asyncio-mode=auto
```

## 🐳 Docker / Production Deployment

Local testing with Docker Compose:
```bash
docker-compose up --build
```
This builds both Next.js and FastAPI into production-ready containers.

### Deployment Strategy
1.  **Backend (Render)**: Connect your repo to Render.com and select the `render.yaml` configuration file for zero-config deployments.
2.  **Frontend (Vercel)**: Import the repository to Vercel workspace. The `vercel.json` provides the correct build context (`frontend/`). Ensure you set the `NEXT_PUBLIC_API_URL` to your Render backend URL in the Vercel dashboard.

---
*Built with precision for Weboin.*
