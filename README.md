# 🐂 Bulltrack Pro – Frontend  
Full-Stack Engineering Challenge (Seed28)

Frontend dashboard for **Bulltrack**, a bovine genetic ranking platform where cattle producers evaluate bulls using dynamic genetic scoring, filtering, and user-specific favorites.

Built with **Next.js App Router**, **Tailwind CSS**, and a feature-based architecture.

---

## 🚀 Tech Stack

| Layer | Tech |
|------|------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Charts | Recharts (RadarChart) |
| Language | TypeScript |
| State | React state + hooks |
| Auth | JWT via cookie |

---

## 🔐 Authentication Flow

Auth is handled using a **JWT token stored in cookies** so middleware can control routing.

### Route Behavior

| Route | Behavior |
|------|----------|
| `/` | Redirects to `/dashboard` if authenticated, else `/login` |
| `/login` | Redirects to dashboard if already logged in |
| `/signup` | Redirects to dashboard if already logged in |
| `/dashboard` | Protected — redirects to login if no token |

Implemented using **Next.js middleware**.

---

## 🧭 App Architecture

The project uses a **feature-based structure** for scalability.

```
src/
 ├─ app/           → Routing layer only
 ├─ features/      → Business domains (auth, bulls, dashboard)
 ├─ components/    → Reusable UI primitives
 ├─ hooks/
 ├─ lib/           → API calls, utilities
 └─ types/
```

### Responsibilities

| Folder | Role |
|-------|------|
| `app/` | Next.js routing (pages, layouts) |
| `features/` | Feature logic and UI |
| `components/` | Shared UI (Button, Loader, etc.) |
| `lib/` | API clients and helpers |

---

## 🐂 Bulls Dashboard

The dashboard displays ranked bulls using data from the backend.

### Features

- Server-driven pagination  
- Server-side filtering  
- Search by ear tag or name  
- Dynamic Bull Score display  
- Radar chart visualization of 5 genetic metrics  
- Favorite toggle per user  

### Radar Chart Metrics

Each bull includes 5 stats displayed in a radar chart:

- Crecimiento  
- Facilidad de parto  
- Reproducción  
- Moderación  
- Carcasa  

Rendered with **Recharts RadarChart**.

---

## ⭐ Favorites

Favorites are user-specific.

Frontend interacts with:

```
POST /favorites/:bullId/toggle
GET /favorites
```

Used to mark/unmark bulls as favorites.

---

## ⏳ Loading States

The UI implements **skeleton loader** for:

- Bulls list loading

This improves perceived performance and avoids layout shifts.

---

## ⚙️ Environment Variables

### `.env` (project default)

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

### `.env.local` (local development)

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 🛠 Setup

```
npm install
npm run dev
```

---

## 📡 Backend Integration

All API requests use:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

Example:

```ts
await fetch(`${API_URL}/bulls?page=1&limit=10`);
```

---

## 🧩 Design Goals

- Pixel-consistent UI with Figma  
- Server-driven data (no frontend filtering)  
- Feature-driven architecture  
- Clean separation of routing and UI  
- Professional loading and error handling

---


## 🔮 Future Improvements (2 more weeks)

- Pixel-perfect polish: finalize spacing/typography/states to match Figma across desktop + tablet, including hover/active/focus accessibility states, dropdowns, etc. Requires full design specifications.
- Consider TanStack Query for caching/pagination ergonomics.
- Error boundaries + retry UI: friendly error screens for failed requests with retry actions and safe fallbacks.
- Favorites UX improvements: optimistic toggle with rollback on failure.
- Radar chart polish: add tooltips, and responsive sizing for the 5-metric visualization.
- Component atomization: split BullCard into smaller components and expand shared UI primitives (Button, Loader, Filters, etc.).
- Admin panel.

---

This frontend pairs with the **Bulltrack Pro backend** to deliver a full-stack cattle genetics ranking platform.
