# InstantChat (Backend)

Express + MongoDB backend for InstantChat. Provides REST endpoints for auth/users/chat metadata and a Socket.IO server for realtime messaging.

## Tech Stack

- Node.js (ESM) + Express
- MongoDB + Mongoose
- JWT auth
- Socket.IO (realtime)

## Prerequisites

- Node.js 18+ recommended
- npm
- A MongoDB instance (local or hosted)

## Environment Variables

Create `backend/.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/instantchat
JWT_SECRET_USER=replace-with-a-long-random-secret
```

Notes:
- `PORT` is optional (defaults to `5000`).
- `JWT_SECRET_USER` must match what the backend uses to sign and verify tokens.

## Setup

```bash
cd backend
npm install
```

## Run

Development (auto-reload):

```bash
npm run dev
```

Production:

```bash
npm start
```

Server starts at `http://localhost:5000` by default.

## REST API

Base path: `/api/v1`

### Auth (public)

- `POST /api/v1/signup`
  - Body: `{ name, email, password, profileUrl? }`
- `POST /api/v1/signin`
  - Body: `{ email, password }`
  - Response: `{ token }`

### Protected routes (require `Authorization: <token>` header)

- `GET /api/v1/users`
  - Returns basic user list: `name`, `_id`, `profileUrl`
- `GET /api/v1/users/me`
  - Returns logged-in user info

- `GET /api/v1/access?chatId=<chatId>`
  - Returns message history for a chatId
- `GET /api/v1/fetchallchatid`
  - Returns chat list for the current user (includes `latestMessage.text`)
- `POST /api/v1/creategroup`
  - Body: `{ users: string[], groupName?, profileUrl? }`
  - Adds the current user as admin + member

## Realtime (Socket.IO)

### Connection

The server expects a JWT token in the Socket.IO handshake:

- Client sends: `io("<SERVER_URL>", { auth: { token } })`
- Server verifies token using `JWT_SECRET_USER` and stores `socket.userId`

The backend keeps a `Map<userId, Set<socketId>>` so one user can be connected from multiple tabs/devices.

### Events

- Client → Server: `message`
  - Payload (one of):
    - `{ chatId, text, _id? }` (send to existing chat)
    - `{ receiverId, text, _id? }` (server creates a 1:1 chatId)

- Server → Client(s): `receiverMessage`
  - Payload: `{ _id, storedNewMessage }`
  - Broadcasted to all sockets of all users in that chat

## Project Structure (high level)

- `src/server.js` — Express app + Socket.IO wiring
- `src/config/db.js` — Mongo connection (uses `MONGO_URI`)
- `src/controllers/` — request handlers
- `src/routes/` — route definitions
- `src/models/` — Mongoose schemas (User/Chat/Message)
- `src/services/` — chat helpers (create chatId, store message, fetch chat list)

## Troubleshooting

- **DB Connected not printing**: verify `MONGO_URI` is set and reachable.
- **Auth fails on sockets**: the client must send `auth.token` and it must be signed with the same `JWT_SECRET_USER`.
- **CORS issues**: Express uses `cors()`; Socket.IO cors is configured to allow all origins in `src/server.js`.
