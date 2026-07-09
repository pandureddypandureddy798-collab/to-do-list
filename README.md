# MERN To-Do Application

Production-ready To-Do List application (MERN) — backend in `server/`, frontend in `client/`.

Quick start

1. Install dependencies for both projects:

```powershell
cd server
npm install
cd ../client
npm install
```

2. Create environment files:

- Copy `server/.env.example` to `server/.env` and set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`.
- Optionally set `VITE_API_URL` in `client/.env` to point to your backend (default `http://localhost:5000/api`).

3. Run backend and frontend (in separate terminals):

```powershell
cd server
npm run dev

cd ../client
npm run dev
```

API Overview

Base URL: `/api`

Auth
- POST `/api/auth/register` — body: `{ name, email, password }`
- POST `/api/auth/login` — body: `{ email, password }`
- GET `/api/auth/profile` — header: `Authorization: Bearer <token>`
- PUT `/api/auth/profile` — header: auth; body: `{ name, profileImage }`
- PUT `/api/auth/change-password` — header: auth; body: `{ currentPassword, newPassword }`

Tasks
- POST `/api/tasks` — create task
- GET `/api/tasks` — list tasks (supports `page`, `limit`, `search`, `status`, `priority`, `category`, `sort`)
- GET `/api/tasks/:id` — get task
- PUT `/api/tasks/:id` — update task
- DELETE `/api/tasks/:id` — soft delete task
- GET `/api/tasks/statistics` — dashboard stats

Database Schemas

- `User`: `{ name, email, password (hashed), profileImage, createdAt, updatedAt }`
- `Task`: `{ title, description, status, priority, category, dueDate, user, isDeleted, createdAt, updatedAt }`

Security

- JWT auth
- bcrypt password hashing
- Helmet, CORS, rate limiting, XSS cleanup

Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas

For full source and file-level documentation, inspect `server/` and `client/` folders.
