# Smart Classroom Scheduler — Frontend (Phase 1)

This is the frontend-only implementation (React + Vite) for the Smart Classroom Scheduler. It provides modules for Authentication (admin), Classrooms, Faculty & Courses, Scheduling, Conflict Detection, and a Calendar view. Data is stored in browser `localStorage` via a simple mock API.

Quick start

1. Install dependencies

```bash
cd /home/riyas/snap/p
npm install
```

2. Run development server

```bash
npm run dev
# open http://localhost:3000
```

3. Build for production

```bash
npm run build
npm run preview
```

Demo credentials

- Username: `admin`
- Password: `admin`

Notes on deployment

- This is a static frontend — you can deploy the `dist` folder to Netlify, Vercel, GitHub Pages or any static host.
- For full MERN integration, replace `src/services/mockApi.js` with real API calls to your Express + MongoDB backend.

Files of interest

- `src/pages` — page modules for each feature
- `src/services/mockApi.js` — mock persistence and conflict detection logic
- `src/context/AuthContext.jsx` — lightweight auth for demo

If you want, I can now:
- Add backend (Node/Express + MongoDB) and wire API endpoints
- Add unit tests and E2E tests
- Improve UI styling or integrate a CSS framework

Which do you want next? (I recommend adding the backend next.)
