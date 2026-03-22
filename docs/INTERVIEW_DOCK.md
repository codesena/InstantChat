# InstantChat — Interview Dock (Explain It Clearly)

This document is written as a speaking guide: you can read it like a script in an interview.

## 1) 30-second intro (pitch)

“InstantChat is a real-time chat app. The frontend is React + Vite, and the backend is Express with MongoDB. Authentication is JWT-based. For realtime delivery, the backend uses Socket.IO: each connected user authenticates during the socket handshake, then messages are persisted in MongoDB and broadcast to all participants in the chat. The chat list is optimized by storing `latestMessage` on the `Chat` document so we can show previews quickly.”

## 2) What I built (high-level features)

- Sign up / Sign in
- Chat list for the logged-in user
- 1:1 chat creation (implicitly) when sending a message to a user for the first time
- Group chat creation
- Realtime message delivery via Socket.IO
- Message persistence in MongoDB
- Profile pictures (frontend uploads directly to Cloudinary)

What I’d highlight in an interview:
- The app combines REST (auth + data) with websockets (realtime), and both share the same JWT.
- Messages are persisted first, then broadcast.

## 3) Architecture overview

### Components

- Frontend (React)
  - Uses Axios for REST calls
  - Uses Socket.IO client for realtime messages
  - Stores JWT token in `localStorage`
- Backend (Express)
  - REST routes under `/api/v1`
  - Middleware verifies JWT for protected routes
  - Socket.IO server shares the same HTTP server
- Database (MongoDB)
  - `User`, `Chat`, `Message` collections

### Mermaid diagram

```mermaid
flowchart LR
  UI[React/Vite UI]
  API[Express REST /api/v1]
  WS[Socket.IO server]
  DB[(MongoDB)]
  Cloud[Cloudinary]

  UI -->|Axios (JWT in Authorization)| API
  UI -->|Socket.IO handshake auth.token| WS
  API --> DB
  WS --> DB
  UI -->|Upload image| Cloud
```

## 4) Data model (what’s in the DB and why)

### User

- `name`, `email` (unique), `password` (hashed), `profileUrl`

### Chat

Supports both 1:1 and group:

- `users`: array of user ids in the chat
- `isGroup`: boolean
- `groupName`, `profileUrl` (for group display)
- `admin`: array (current code stores admins here)
- `latestMessage`: ObjectId reference to `Message`

Why `latestMessage` exists:
- Chat lists are read frequently.
- Instead of querying the latest message for every chat each time, we keep a pointer on `Chat` and populate it.

### Message

- `senderId`, `chatId`, `text`, `seenBy` (not fully used yet)

Note (repo reality): there is also a `GroupChats` model in the codebase, but group chats are currently stored in the same `Chat` collection via `isGroup: true`.

## 5) Auth story (how login and authorization works)

### REST

- On `POST /signin`, server returns a JWT with payload `{ userId }`.
- Frontend stores it in `localStorage` under `token`.
- Axios interceptor attaches it as `Authorization: <token>`.
- Backend middleware verifies token and sets `req.userId`.

### Socket.IO

- The frontend connects with:
  - `io(SERVER_URL, { auth: { token } })`
- Backend verifies the token in `io.use(...)` and sets `socket.userId`.

Payload detail:
- Token is sent as `socket.handshake.auth.token` (not via headers).

What I’d say in an interview:
- “I used the same JWT for both REST and websockets. REST uses an Express middleware; sockets verify token in the handshake middleware.”

## 6) Core flows (step-by-step)

### A) User signs in

1. Frontend calls `POST /api/v1/signin`.
2. Backend checks user credentials with bcrypt.
3. Backend returns JWT.
4. Frontend saves JWT and navigates into the app.

Example request:

```json
{ "email": "user@example.com", "password": "password" }
```

Example response:

```json
{ "message": "Signin SuccesFully!", "token": "<jwt>" }
```

### B) Chat list loads

1. Frontend calls `GET /api/v1/fetchallchatid`.
2. Backend queries `Chat` documents where `users` contains `req.userId`.
3. It populates:
   - `users` (basic fields)
   - `latestMessage` (only `text`)
4. Backend maps response into a convenient UI shape:
   - For 1:1 chats, returns the *other user* as `name/userId/profileUrl`.
   - For groups, returns `groupName/users/admin/profileUrl`.

Example response shape (simplified):

```json
[
  { "_id": "<chatId>", "isGroup": false, "name": "Alice", "userId": "<aliceId>", "profileUrl": "...", "text": "last message" },
  { "_id": "<chatId>", "isGroup": true, "groupName": "Study Group", "users": [/*...*/], "profileUrl": "...", "text": "last message" }
]
```

### C) Open a chat and load messages

1. Frontend calls `GET /api/v1/access?chatId=...`.
2. Backend returns all messages for that `chatId`.

Example response shape:

```json
{ "chatId": "<chatId>", "chat": [ { "_id": "...", "senderId": "...", "text": "..." } ] }
```

### D) Send a message (Realtime)

1. Frontend emits Socket.IO event `message`.
2. Backend resolves `chatId`:
   - If `chatId` exists, use it.
   - Else if `receiverId` exists, create a new chat with `[sender, receiver]`.
3. Backend stores the new message in MongoDB.
4. Backend updates `chat.latestMessage` to the stored message.
5. Backend broadcasts `receiverMessage` to all sockets for all users in the chat.

Client → Server example payloads:

```json
{ "chatId": "<chatId>", "text": "hello", "_id": "<clientMessageId>" }
```

or

```json
{ "receiverId": "<userId>", "text": "first message" }
```

Server → Clients example payload:

```json
{ "_id": "<clientMessageId>", "storedNewMessage": { "_id": "<dbId>", "chatId": "<chatId>", "senderId": "<userId>", "text": "hello" } }
```

Key implementation detail:
- The server keeps `userSocketMap: Map<userId, Set<socketId>>`, so if a user is connected from multiple tabs/devices, they all receive the message.

## 7) Realtime delivery contract (what events exist)

- Client → Server: `message`
- Server → Client: `receiverMessage`
- Server → Client (error): `errorMessage`

Important: There is also a REST endpoint `POST /api/v1/message` in the backend routes, but the primary realtime path in this repo is the Socket.IO `message` event.

In an interview, I’d mention:
- “I designed it so that persistence happens first (Mongo write), then the event is broadcast. That prevents ‘delivered but not saved’ inconsistencies.”

## 8) Security & correctness notes (what I’d be honest about)

- JWT is currently passed as raw token string in `Authorization` header (not `Bearer <token>`). It works, but I’d standardize it.
- Socket auth depends on the client providing `auth.token`; if missing, connection is rejected.
- CORS is permissive for development (`origin: "*"` for sockets).
- There’s no rate limiting or brute-force protection on signin yet.
- Input validation is mostly assumed to be done on the frontend; a production backend should validate server-side too.

Repo/codebase notes I’d mention (without over-explaining):
- `src/services/messageSocket.js` exists but is not currently wired into the running server.
- DB connection uses `mongoose.connect(process.env.MONGO_URI)` without awaiting; production code should handle async connection errors explicitly.

## 9) Scaling story (what happens in production)

Current behavior:
- `userSocketMap` is in-memory.

If the app runs on multiple instances:
- A user might connect to instance A, while another user sends a message via instance B.
- To fan-out across instances, I’d use a Socket.IO adapter (Redis) so events and user presence work cluster-wide.

Database scaling:
- Index frequently queried fields (e.g., `Chat.users`, `Message.chatId`, `User.email`).

## 10) Common interview questions (ready answers)

### “Why Socket.IO instead of polling?”

- “Polling wastes requests and adds latency. Socket.IO provides push-based updates and can fall back to long-polling if needed.”

### “How do you make chat list fast?”

- “I store `latestMessage` on the chat document and populate it, so the list query is one request and doesn’t require N queries for N chats.”

### “How do you handle multiple tabs?”

- “I map one userId to multiple socketIds using a `Map<userId, Set<socketId>>` and broadcast to all of them.”

### “What would you improve next?”

- Add server-side validation (e.g., Zod)
- Add proper error handling middleware and consistent response format
- Add typing indicators and message seen receipts
- Standardize config using environment variables (API base URL, socket URL)
- Add Redis adapter for horizontally scaled Socket.IO

## 11) 60-second demo walkthrough (good to say out loud)

“I sign up/sign in, which returns a JWT. The app stores it and uses it for both REST and the socket handshake. On the main screen, I fetch my chat list using a single query that returns the other participant plus a `latestMessage` preview. When I open a chat, I fetch messages by chatId. When I send a message, it goes over Socket.IO: the server saves it, updates the chat’s `latestMessage`, and broadcasts the stored message to both users’ connected devices.”
