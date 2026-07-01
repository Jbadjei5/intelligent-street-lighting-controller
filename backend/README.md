# Intelligent Street Lighting Controller — Backend

Node.js + Express + PostgreSQL backend that powers two parts of the frontend:

1. **Remote Access** — real signup/login with hashed passwords and JWT sessions
   (the dashboard itself still shows "Coming Soon", as requested).
2. **Stats strip** — the "ENERGY SAVED" figure is computed live from logged
   device data; the other three figures are fixed project facts served from
   config (set via env vars) so the whole `/api/stats` payload comes from the
   backend rather than being hard-coded in the frontend.

## 1. Prerequisites

- Node.js 18+
- A running PostgreSQL instance (local, Docker, or hosted e.g. Supabase/Neon/Railway)

## 2. Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- Set `DATABASE_URL` (or the individual `PG*` vars) to point at your Postgres database.
- Set `JWT_SECRET` to a long random string.
- Set `CLIENT_ORIGIN` to wherever your frontend runs (`http://localhost:5173` by default).

Create the database if it doesn't exist yet:

```bash
createdb street_lighting
```

Run the migration to create tables:

```bash
npm run migrate
```

(Optional but recommended) seed 30 days of sample device-log data so the
Stats endpoint has real numbers to compute from immediately:

```bash
npm run seed
```

## 3. Run

```bash
npm run dev      # auto-restarts on file changes
# or
npm start
```

The API listens on `http://localhost:4000` by default.

## 4. Wire up the frontend

In the frontend project root, copy `.env.example` to `.env` and confirm
`VITE_API_BASE_URL` points at this backend (`http://localhost:4000` by
default), then run the frontend as usual (`npm run dev`).

## 5. API Reference

### `POST /api/auth/signup`
Body: `{ "username": "kwaku", "email": "kwaku@example.com", "password": "min 8 chars" }`
Returns: `{ token, user }`

### `POST /api/auth/login`
Body: `{ "identifier": "kwaku-or-email", "password": "..." }`
Returns: `{ token, user }`

### `GET /api/auth/me`
Header: `Authorization: Bearer <token>`
Returns: `{ user }`

### `GET /api/stats`
Public. Returns:
```json
{
  "stats": [
    { "label": "YEARS OF RESEARCH", "value": "2+", "source": "static" },
    { "label": "SENSORS INTEGRATED", "value": "2", "source": "static" },
    { "label": "PWM CHANNELS", "value": "6", "source": "static" },
    { "label": "ENERGY SAVED", "value": "45%", "source": "computed" }
  ],
  "details": { "totalReadings": 721, "motionEvents": 128, "uptimePercent": 99, "energySavedPercent": 45 }
}
```

### `GET /api/health`
Simple liveness check, returns `{ "status": "ok" }`.

## 6. Database schema

See `src/db/schema.sql`:
- `users` — id, username, email, password_hash, created_at
- `device_logs` — recorded_at, light_level, motion_detected, led_brightness,
  baseline_brightness, is_online. This is the table the "ENERGY SAVED" stat
  is computed from. If/when the dashboard phase begins and a real device
  (e.g. an ESP8266/ESP32-based version of the Arduino board, or the Arduino
  relaying through a serial-to-WiFi bridge) starts reporting in, a future
  `POST /api/logs` ingestion route can insert rows into this same table and
  the stats will automatically reflect real hardware data — no schema change
  needed.

## 7. Security notes

- Passwords are hashed with bcrypt (cost factor 12), never stored in plaintext.
- JWTs are signed with `JWT_SECRET` and expire after `JWT_EXPIRES_IN` (default 1 day).
- Login is rate-limited (20 attempts / 15 min per IP) to slow brute-forcing.
- All routes are rate-limited globally as a basic abuse safeguard.
- CORS is locked to `CLIENT_ORIGIN`.
