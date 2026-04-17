# TaskFlow — Task Management for Creative Teams

A modern, full-stack task management application built for **Weboin Technologies Private Limited** — a Chennai-based digital marketing and web development agency.

TaskFlow streamlines campaign tracking, web project management, and client deliverable workflows in one unified platform.

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- FastAPI (Python 3.11+)
- SQLAlchemy (async)
- Pydantic v2
- PostgreSQL (Supabase)

### Auth
- JWT (python-jose)
- bcrypt (passlib)

## Project Structure

```
/frontend        → Next.js application
/backend         → FastAPI application
/docker          → Dockerfiles (Phase 3)
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- pnpm
- PostgreSQL (Supabase)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Configure your database URL and secrets
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
pnpm install
cp .env.local.example .env.local  # Configure API URL
pnpm dev
```

### Seed Demo Data

```bash
cd backend
python seed.py
```

Demo credentials: `demo@weboin.com` / `demo1234`

## Development Phases

- **Phase 1**: Backend API, Landing Page, Auth, Dashboard Placeholder
- **Phase 2**: Full Dashboard, Voice AI, Calendar View
- **Phase 3**: Testing, Docker, CI/CD, Documentation

## License

Proprietary — Weboin Technologies Private Limited

---

Built by Weboin Technologies Private Limited | Chennai, India | Est. 2013
