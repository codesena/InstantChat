# InstantChat

A real-time chat application.

- Frontend: React + Vite + Tailwind + Recoil
- Backend: Express + MongoDB (Mongoose) + JWT + Socket.IO

## Docs

- Frontend setup: [frontend/README.md](frontend/README.md)
- Backend setup: [backend/README.md](backend/README.md)
- Interview speaking guide: [docs/INTERVIEW_DOCK.md](docs/INTERVIEW_DOCK.md)

## Quickstart (Local)

### 1) Backend

```bash
cd backend
npm install

# create backend/.env (see backend/README.md)

npm run dev
```

Backend defaults to `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend defaults to `http://localhost:5173`.

## Important note (API URLs)

The frontend currently points to a hosted backend by default.

If you want to run everything locally, update:

- `frontend/src/services/api.jsx` (REST base URL)
- `frontend/src/services/Socket.jsx` (Socket server URL)
