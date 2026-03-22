# InstantChat (Frontend)

React + Vite frontend for InstantChat.

## Tech Stack

- React 18, Vite
- Tailwind CSS
- Recoil (state)
- Axios (REST)
- Socket.IO client (realtime messages)

## Prerequisites

- Node.js 18+ recommended
- npm

## Setup

```bash
cd frontend
npm install
```

## Run (Development)

```bash
npm run dev
```

Vite prints the local URL in the terminal (typically `http://localhost:5173`).

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Backend / API Configuration

This repo currently points the frontend to a hosted backend by default:

- REST base URL: `frontend/src/services/api.jsx`
- Socket server URL: `frontend/src/services/Socket.jsx`

If you want to run the backend locally, update both URLs to your local server, for example:

- `http://localhost:5000/api/v1` (REST)
- `http://localhost:5000` (Socket)

Note: the current implementation does not use `VITE_*` environment variables for these URLs.

## Auth (How it works)

- After successful signin, the app stores the JWT in `localStorage` under `token`.
- Axios adds `Authorization: <token>` to every request via an interceptor.
- Socket.IO sends the token in the handshake payload (`auth.token`).

## Image Uploads (Cloudinary)

Profile image upload uses Cloudinary from the browser:

- `frontend/src/services/cloudinaryUrl.js`

If you want to use your own Cloudinary account, change `cloud_name`, `upload_preset`, and the upload URL.

## Troubleshooting

- **401 / Authentication error**: confirm you have a valid `token` in `localStorage` and that the backend JWT secret matches the token issuer.
- **CORS issues**: backend currently allows `origin: "*"` for Socket.IO and enables `cors()` for Express.
- **Running local backend but frontend still hits hosted API**: update both `api.jsx` and `Socket.jsx` URLs.
