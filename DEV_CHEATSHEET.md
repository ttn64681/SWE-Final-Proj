# 🎯 ACM Cinema – Developer Cheatsheet

## 📌 Overview
- Frontend: Next.js (App Router, TS, Tailwind)
- Backend: Spring Boot (JSON APIs)
- State: Local component state + shared `FiltersContext` for search filters
- Patterns: URL-driven search, client-side fetch, shared popup for filters

---

## 🔌 API Configuration
- File: `frontend/src/config/api.ts`
- Why it exists: Central source of truth for backend paths, so components don’t hardcode URLs.
- Base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:8080`)
- Endpoints (movies):
  - Lists: `/api/movies/now-playing`, `/api/movies/upcoming`
  - Search: `/api/movies/search-now-playing`, `/api/movies/search-upcoming`
  - Genres: `/api/movies/genres`
  - Details: `/api/movies/{movieId}`
  - Schedule: `/api/movies/{movieId}/dates`, `/api/movies/{movieId}/times?date=YYYY-MM-DD`
- How calls are built (pattern):
  1) Build `URLSearchParams` from UI state.
  2) Build a full URL with `buildUrl(endpoint)`.
  3) `fetch(urlWithQuery) → res.json()`.
```ts
const url = buildUrl(endpoints.movies.searchNowPlaying);
const params = new URLSearchParams({ title, genres, month, day, year });
const res = await fetch(`${url}?${params.toString()}`);
const data = await res.json();
```

---

## 🧩 Providers & Shared State
- What problem it solves: Multiple components (NavBar, FiltersPopUp, Movies page) need the same filters without prop drilling.
- Where it lives: `frontend/src/contexts/FiltersContext.tsx`.
- How it’s wired:
  - `app/layout.tsx` wraps the entire app in `<FiltersProvider>` so any child can read/write filters.
  - Components call the custom hook `useFilters()` to access `{ selectedGenres, selectedDate, setSelectedGenres, setSelectedDate }`.
- Data model:
  - `selectedGenres: Set<string>` — chosen genres, unique, fast add/remove.
  - `selectedDate: { month, day, year }` — optional fields to filter results.
- Read/Write from anywhere:
```tsx
import { useFilters } from '@/contexts/FiltersContext';

export function Example() {
  const { selectedGenres, setSelectedGenres, selectedDate, setSelectedDate } = useFilters();

  // Read state
  const isAction = selectedGenres.has('Action');

  // Update state (always create a new Set)
  setSelectedGenres(prev => { const next = new Set(prev); next.add('Drama'); return next; });
  setSelectedDate({ month: '9', day: '26', year: '2025' });
  return null;
}
```
- Why a custom hook: `useFilters()` hides Context plumbing and provides strong typing, making usage simple and safe.

---

## 🔍 Search & Filters Flow (End-to-End)
Goal: Users can search by title, select genres/date, and see both Now Playing and Upcoming results together.

1) Input & Filter Selection
- NavBar and Movies page both offer a search input.
- Filters are chosen in `FiltersPopUp` (same popup opened from NavBar or Movies page).
- Selections persist via `FiltersContext`.

2) Building the query
- On search submit (magnifying glass), we combine title + genres + date from `FiltersContext`:
```ts
const params = new URLSearchParams();
if (title) params.set('title', title.trim());
if (selectedGenres.size) params.set('genres', Array.from(selectedGenres).join(','));
if (selectedDate.month) params.set('month', selectedDate.month);
if (selectedDate.day) params.set('day', selectedDate.day);
if (selectedDate.year) params.set('year', selectedDate.year);
router.push(`/movies?${params}`);
```

3) Reading the query & fetching
- `movies/page.tsx` reads `useSearchParams()` and fires two parallel requests:
  - `search-now-playing?…` and `search-upcoming?…`
- Each section has its own loading state so UI feels responsive.

4) Rendering
- Results render through `MovieCardsGrid`. No dummy data is used in search mode.

Why URL-driven search?
- Deep-linkable: you can share the URL and get the same results.
- Predictable: server/devtools show exactly which params were used.

---

## 🎬 Movies & Details (User Journey)
- Movie card (`MovieCard.tsx`):
  - Displays poster, rating badge, and hover overlay (title, synopsis, top genres, release date).
  - “Preview” button shows `TrailerEmbed` (YouTube embed) without leaving the page.
  - Clicking the card opens the details popup `SelectedMovie`.

- Details popup (`SelectedMovie.tsx`):
  - Left half: fullscreen poster; bottom-aligned title, rating, date, genres, synopsis. Non-scroll; content pushes up naturally.
  - Right half: trailer at top, then date dropdown and available times, then cast/producer/director, then tickets CTA.

- Date → Times fetching logic:
  1) On open: `GET /api/movies/{movieId}/dates` populates the dropdown and auto-selects the first date.
  2) On date change: `GET /api/movies/{movieId}/times?date=YYYY-MM-DD` updates the times list.
  3) Times payloads can be either strings or objects; we map to a readable string (e.g., `start_time`).

- Book tickets CTA:
  - Routes the user to `/booking` with `title`, `date`, `time` as query params.

Why split left/right?
- Matches mental model: quick visual on the left; actionable steps (watch preview, pick date/time, book) on the right.

---

## 🎟️ Booking Flow (From Seat → Checkout)
- Seats page (`booking/(seats)/page.tsx`):
  - Header card shows movie title + selected `date • time`.
  - Grid of seats with local selection state; Submit routes to `/booking/ticket-age?seats=&title=&date=&time=`.
  - A bottom promo banner (20% discount) offers a shortcut to checkout via “Apply Now!”.

- Ticket Selection (`booking/ticket-age/page.tsx`):
  - Header: “Ticket Selection for "title"” and `date • time` to reinforce context.
  - `TicketTable` uses a grid layout (label, counter, price, actions column). Rows: Adult, Child, Senior.
  - Footer row shows the total count and a large, right-aligned total price next to a compact non-wrapping checkout button.
  - Same discount banner at bottom with “Apply Now!” linking to `/booking/checkout`.

Why the two-step flow?
- Seat selection is spatial; ticket type selection is numeric. Splitting keeps each step focused and clear.

---

## 🎨 UI/Styling Conventions
- Theme: Dark background with blurred cards
  - `bg-white/5`, `backdrop-blur-md`, `border-white/10`, rounded-xl
- Accents: `text-acm-pink`, gradients (pink → orange) for primary buttons
- Buttons: gradient, rounded, `hover:brightness-110`
- Icons: `react-icons` (`PiMagnifyingGlass`, `IoFilterOutline`, etc.)
- Images: `next/image` with `fill` + `sizes` (e.g., `"100vw"`)

---

## 📁 Quick File Index
- API: `src/config/api.ts`
- Layout/Provider: `src/app/layout.tsx` (wraps `FiltersProvider`)
- Context: `src/contexts/FiltersContext.tsx`
- Nav/Search: `components/common/navBar/NavBar.tsx`
- Filters Popup: `components/specific/movies/FiltersPopUp.tsx`
- Movies Page: `src/app/(public)/movies/page.tsx`
- Movies Grid: `components/common/movies/MovieCardsGrid.tsx`
- Movie Card/Preview: `components/common/movies/MovieCard.tsx`, `TrailerEmbed.tsx`
- Details Popup: `components/common/movies/SelectedMovie.tsx`
- Seats: `app/(booking)/booking/(seats)/page.tsx`
- Ticket Selection: `app/(booking)/booking/ticket-age/page.tsx`
- Footer: `components/specific/home/Footer.tsx` (used in home page)

---

## 🔁 Data Fetch Patterns
```ts
// Build params
const params = new URLSearchParams();
if (title) params.set('title', title);
if (genres) params.set('genres', genres);
if (month) params.set('month', month);
if (day) params.set('day', day);
if (year) params.set('year', year);

// Fetch
const res = await fetch(`${buildUrl(endpoints.movies.searchUpcoming)}?${params.toString()}`);
const data = await res.json();
```

```ts
// SelectedMovie times fetch
const url = new URL(buildUrl(endpoints.movies.times(movieId)));
url.searchParams.set('date', 'YYYY-MM-DD');
const times = await (await fetch(url)).json();
```

---

## 📊 API Flow Summary Table
| When | Component | Endpoint | Query/Params | Result |
|---|---|---|---|---|
| Home load (tab switch) | Home `page.tsx` | `/api/movies/now-playing` or `/upcoming` | none | List of movies for section |
| Fetch genres (first open) | `FiltersPopUp.tsx` | `/api/movies/genres` | none | `string[]` of genre names |
| User presses search | `NavBar.tsx` / Movies `page.tsx` | `search-now-playing` | `title, genres, month, day, year` | Filtered Now Playing movies |
| User presses search | `NavBar.tsx` / Movies `page.tsx` | `search-upcoming` | `title, genres, month, day, year` | Filtered Upcoming movies |
| Open SelectedMovie | `SelectedMovie.tsx` | `/api/movies/{id}/dates` | `movieId` | Available dates for showtimes |
| Select a date | `SelectedMovie.tsx` | `/api/movies/{id}/times` | `date=YYYY-MM-DD` | Available times (strings or objects) |
| Open movie details (optional) | Anywhere | `/api/movies/{id}` | `movieId` | Movie details object |

