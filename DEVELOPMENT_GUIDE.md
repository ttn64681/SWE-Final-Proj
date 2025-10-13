# Cinema E-Booking System - Developer Reference

## Table of Contents

1. [API Reference](#api-reference)
2. [Data Models](#data-models)
3. [Frontend Components](#frontend-components)
4. [Custom Hooks](#custom-hooks)
5. [Contexts](#contexts---global-state-management)
6. [React Query & useRef Patterns](#react-query--useref-patterns)
7. [Performance Patterns](#performance-patterns)
8. [Development Patterns](#development-patterns)

---

## API Reference

### Authentication Endpoints

#### `POST /api/auth/register`

**Returns**: `{ accessToken: string, user: UserInfo }`
**Called by**: Registration form submission
**Consumed by**: `AuthContext.login()`

#### `POST /api/auth/login`

**Returns**: `{ accessToken: string, user: UserInfo }`
**Called by**: Login form submission
**Consumed by**: `AuthContext.login()`

#### `POST /api/auth/refresh`

**Returns**: `UserInfo` if token valid
**Called by**: App startup, protected route access
**Consumed by**: `AuthContext.checkAuthStatus()`

### Movie Endpoints

#### `GET /api/movies/now-playing`

**Returns**: `BackendMovie[]` - Currently showing movies
**Called by**: Homepage load, "Now Playing" tab
**Consumed by**: `useMovies('nowplaying')`

#### `GET /api/movies/upcoming`

**Returns**: `BackendMovie[]` - Upcoming releases
**Called by**: "Upcoming" tab click
**Consumed by**: `useMovies('upcoming')`

#### `GET /api/movies/genres`

**Returns**: `string[]` - Available genres
**Called by**: Filter popup open
**Consumed by**: `useGenres()`

#### `GET /api/movies/search-now-playing`

**Returns**: `BackendMovie[]` - Filtered now-playing movies
**Query Params**: `title`, `genres`, `month`, `day`, `year`
**Called by**: Search form submission
**Consumed by**: `useMovieSearch()`

#### `GET /api/movies/{movieId}`

**Returns**: `BackendMovie` - Single movie details
**Called by**: Movie detail popup open
**Consumed by**: `SelectedMovie` component

#### `GET /api/movies/{movieId}/dates`

**Returns**: `ShowDate[]` - Available show dates
**Called by**: Date selection in movie popup
**Consumed by**: React Query in `SelectedMovie`

#### `GET /api/movies/{movieId}/times`

**Returns**: `ShowTime[]` - Showtimes for selected date
**Query Params**: `date` - Selected show date
**Called by**: Time selection after date selection
**Consumed by**: React Query with `movie.movie_id` + `selectedDate` dependencies

### User Endpoints

#### `GET /api/users/`

**Returns**: `User[]` - All users (admin only)
**Called by**: Admin user management page
**Consumed by**: Admin dashboard

#### `GET /api/users/{userId}`

**Returns**: `User` - User details
**Called by**: User profile page
**Consumed by**: User profile component

---

## Data Models

### Backend Entities

#### `Movie.java`

**Fields**: `movie_id`, `title`, `status`, `genres`, `rating`, `release_date`, `synopsis`, `trailer_link`, `poster_link`, `cast_names`, `directors`, `producers`
**Used by**: Movie endpoints, frontend movie displays
**Relationships**: One-to-many with `ShowDate`

#### `User.java`

**Fields**: `user_id`, `email`, `password_hash`, `first_name`, `last_name`, `phone_number`, `address`, `state`, `country`, `created_at`
**Used by**: Authentication endpoints, user management
**Security**: Password BCrypt hashed

#### `ShowDate.java`

**Fields**: `date_id`, `movie_id`, `show_date`
**Used by**: Movie showtime selection
**Relationships**: Many-to-one with `Movie`, one-to-many with `ShowTime`

#### `ShowTime.java`

**Fields**: `time_id`, `date_id`, `show_time`
**Used by**: Showtime selection after date selection
**Relationships**: Many-to-one with `ShowDate`

### DTOs

#### `AuthResponse`

**Returns**: `{ accessToken: string, user: UserInfo }`
**Used by**: Login/register endpoints
**Consumed by**: `AuthContext` for token storage

#### `LoginRequest`

**Fields**: `email`, `password`
**Validation**: Email format, password min 8 chars
**Used by**: Login endpoint

#### `RegisterRequest`

**Fields**: `email`, `password`, `firstName`, `lastName`, `phoneNumber`, `state`, `country`
**Used by**: Registration endpoint

---

## Frontend Components

### Common Components

#### `MovieCard` - Individual Movie Display

**What it does**: Shows a single movie with poster, title, genres, and rating
**Props**:

- `movie`: Movie data object
- `onSelect`: Function to call when user clicks on the movie

**What you see**: Movie poster, title, genre tags, rating badge
**What happens when clicked**: Calls `onSelect(movie)` which opens the `SelectedMovie` popup
**Used by**: Movie grids on homepage and search results

**Smart features**: Uses `useMemo` to split comma-separated genres into individual tags

#### `SelectedMovie` - Movie Detail Popup

**What it does**: Shows detailed movie info in a popup with showtimes and booking
**Props**:

- `movie`: Movie data object or null
- `onClose`: Function to close the popup

**What you see**:

- Movie poster and basic info
- YouTube trailer
- Available show dates and times
- Cast and crew info
- Book button

**How it gets showtimes**: Uses React Query to fetch dates and times from the API
**Used by**: Opens when you click on a `MovieCard`

#### `NavBar` - Main Navigation

**What it does**: Shows the main navigation bar at the top of every page
**Props**: None (gets data from `AuthContext`)

**What changes based on login**:

- **Not logged in**: Shows "Join" button
- **Logged in**: Shows user's name and dropdown menu with logout option

**Used by**: Every page (added in root layout)
**Gets data from**: `AuthContext` (user info, login status)

#### `AuthFormContainer`

**Props**: `{ children: ReactNode }`
**Returns**: JSX - Wrapper with glassmorphism styling and responsive centering
**Used by**: `login/page.tsx`, `register/page.tsx`, `forgot-pwd/page.tsx`
**Styling**: Dark theme with backdrop blur, accounts for navbar height

#### `AuthInput`

**Props**: `{ id, label, type, value, onChange, placeholder?, error?, required?, disabled? }`
**Returns**: JSX - Standardized input field with error handling
**Used by**: All authentication forms (`AuthFormContainer` children)
**Features**: Error display, consistent styling, accessibility support

#### `AuthButton`

**Props**: `{ type, onClick?, disabled?, loading?, variant?, children }`
**Returns**: JSX - Standardized button with loading states
**Used by**: All authentication forms
**Variants**: `primary` (default), `secondary`, `transparent`

### Specific Components

#### `MovieTabsSection`

**Props**: None (uses `useMovies`)
**Returns**: JSX - Now Playing/Upcoming tabs with smooth transitions
**Used by**: Homepage (`page.tsx`)
**Uses Hook**: `useMovies(activeTab)` for data fetching and loading states
**State**: Manages active tab switching between 'nowplaying' and 'upcoming'

#### `FiltersPopUp`

**Props**: None (uses `FiltersContext`)
**Returns**: JSX - Genre checkboxes, date picker, search button
**Used by**: Movies page (`movies/page.tsx`)
**Uses from Context**: `FiltersContext` - `selectedGenres`, `selectedDate`, setter functions
**Uses Hook**: `useGenres()` for genre options
**Calls**: `FiltersContext.setSelectedGenres()` and `setSelectedDate()` for state updates

#### `CinemaLayout`

**Props**: `{ seats: Seat[], onSeatSelect: (seatId) => void }`
**Returns**: JSX - Seat grid with available/selected/occupied states
**Used by**: Booking flow (`booking/(seats)/page.tsx`)
**Uses Hook**: `useSeats()` for seat selection state management
**Calls**: `onSeatSelect(seatId)` when seat clicked, `useSeats.toggleSeat()` for state updates

---

## Custom Hooks

### `useMovies(activeTab)` - Movie Data Hook

**What it does**: Fetches and caches movie data for "Now Playing" or "Upcoming" tabs
**Parameters**: `activeTab` - Either 'nowplaying' or 'upcoming'
**Returns**:

- `movies`: Array of movie objects
- `isLoadingMovies`: True while loading, false when done
- `refetchMovies`: Function to manually refresh the data

**Smart caching**:

- Stores data in memory for 5 minutes
- If you switch tabs and come back within 5 minutes, shows cached data instantly
- Only makes API call if cache is expired or empty

**Used by**: `MovieTabsSection` on the homepage
**API calls**: `GET /api/movies/now-playing` or `GET /api/movies/upcoming`

### `useGenres()` - Genre List Hook

**What it does**: Fetches the list of available movie genres (Action, Comedy, Drama, etc.)
**Parameters**: None
**Returns**:

- `genres`: Array of genre strings
- `isLoadingGenres`: Loading state
- `refetchGenres`: Function to refresh genres

**Why it's simple**: Genres don't change often, so it fetches once and keeps the data
**Used by**: `FiltersPopUp` component for genre checkboxes
**API call**: `GET /api/movies/genres`

### `useMovieSearch()` - Search Results Hook

**What it does**: Searches for movies based on URL parameters (title, genres, date)
**Parameters**: None (automatically reads from URL)
**Returns**:

- `nowPlayingMovies`: Search results for current movies
- `upcomingMovies`: Search results for upcoming movies

**How it works**: When URL changes (user searches), it automatically fetches new results
**Used by**: Movies page to display search results
**API calls**: `GET /api/movies/search-now-playing` and `GET /api/movies/search-upcoming`

### `useSearchLogic()` - Search Input Hook

**What it does**: Handles search input and prevents duplicate searches
**Parameters**: None
**Returns**:

- `searchQuery`: Current search text
- `setSearchQuery`: Function to update search text
- `handleSearch`: Function to perform search
- `handleKeyPress`: Function for Enter key handling

**Smart features**:

- Reads filter settings from `FiltersContext` (genres, dates)
- Prevents duplicate searches using `useRef`
- Updates URL when search is performed

**Used by**: Movies page search bar and filter popup

### `useSeats()` - Seat Selection Hook

**What it does**: Manages which seats are selected in the cinema layout
**Parameters**: None
**Returns**:

- `selectedSeats`: Array of selected seat IDs
- `toggleSeat`: Function to select/deselect a seat
- `clearSelection`: Function to clear all selections

**Used by**: Seat selection page in booking flow
**State**: Local state only (no API calls)

---

## Contexts - Global State Management

**What are Contexts?**: React Contexts are like global variables that any component can access. Instead of passing data down through many component layers, you can access it directly.

### `AuthContext` - User Authentication

**What it does**: Manages user login state across the entire app
**Provides**:

- `user`: Current logged-in user info (name, email, etc.) or null if not logged in
- `isAuthenticated`: Simple true/false - is someone logged in?
- `isLoading`: True while checking if user is logged in (on app startup)
- `login()`: Function to log in a user
- `logout()`: Function to log out a user
- `checkAuthStatus()`: Function to check if user is still logged in

**How login works**:

1. User enters email/password
2. Calls `authAPI.login()` to send credentials to backend
3. Backend returns JWT token and user info
4. Stores token in browser storage (localStorage or sessionStorage)
5. Updates `user` and `isAuthenticated` state

**Used by**:

- `NavBar`: Shows "Join" button OR user menu based on login status
- `UserMenu`: Shows user name and logout option
- Protected routes: Redirects to login if not authenticated

### `RegistrationContext` - Multi-Step Registration

**What it does**: Manages data across the 3-step registration process
**Provides**:

- `currentStep`: Which step user is on (1, 2, or 3)
- `formData`: All the data collected so far
- `setFormData()`: Function to update form data
- `nextStep()`: Move to next step
- `prevStep()`: Go back to previous step
- `resetForm()`: Start over

**The 3 steps**:

1. **Step 1**: Email, password, confirm password
2. **Step 2**: First name, last name, phone number
3. **Step 3**: Payment info (optional - can be skipped)

**Used by**: All registration pages to share data between steps

### `FiltersContext` - Movie Search Filters

**What it does**: Stores selected filters for movie search
**Provides**:

- `selectedGenres`: Set of selected genres (Action, Comedy, etc.)
- `setSelectedGenres()`: Function to update selected genres
- `selectedDate`: Object with month, day, year for date filtering
- `setSelectedDate()`: Function to update selected date

**How it works**:

1. User opens filter popup and selects genres/dates
2. Filter selections are stored in context
3. When user searches, `useSearchLogic()` reads these filters
4. Search API call includes the selected filters

**Used by**:

- `FiltersPopUp`: Sets the filter values
- `useSearchLogic()`: Reads filter values for search

---

## React Query & useRef Patterns

### React Query (`useQuery`) - What is it?

**Simple Explanation**: React Query is like a smart cache for API calls. Instead of manually managing loading states and caching, it handles everything automatically.

**What it does**:

- **Caches data**: If you fetch the same data twice, it returns cached version instead of making another API call
- **Background updates**: Keeps data fresh by refetching in the background
- **Loading states**: Automatically provides loading, error, and success states
- **Deduplication**: If multiple components request the same data, it only makes one API call

**Setup**: Already configured in the app with 5-minute cache duration and 3 retry attempts

#### Movie Dates Query - Real Example

**Where it's used**: `SelectedMovie.tsx` (when you click on a movie card)
**What it does**: Fetches available show dates for a specific movie
**Query Key**: `['movie-dates', movie.movie_id]` - This is like a unique ID for this specific query
**API Call**: `GET /api/movies/{movieId}/dates`
**What you get back**:

- `data`: Array of available dates
- `isLoading`: True while fetching, false when done
- `error`: Error message if something went wrong
  **Smart behavior**: Only fetches when a movie is actually selected (not on empty state)

#### Movie Showtimes Query - Real Example

**Where it's used**: `SelectedMovieShowtimes.tsx` (after you pick a date)
**What it does**: Fetches available showtimes for the selected date
**Query Key**: `['movie-times', movie.movie_id, currentDate]` - Changes when date changes
**API Call**: `GET /api/movies/{movieId}/times?date=YYYY-MM-DD`
**What you get back**: Array of available showtimes for that date
**Smart behavior**: Only fetches when both movie AND date are selected

### useRef Patterns - What is it?

**Simple Explanation**: `useRef` is like a box that remembers a value between renders, but doesn't cause the component to re-render when the value changes.

**When to use it**:

- Store values that need to persist but don't affect the UI
- Prevent duplicate actions
- Store references to DOM elements or timers

#### Duplicate Request Prevention - Real Example

**Problem**: User clicks search button multiple times quickly → Multiple API calls
**Solution**: Store the last search in `useRef` and skip if it's the same
**Code**: `const lastSearchRef = useRef<string>('')`
**How it works**:

1. User searches for "action movies"
2. `lastSearchRef.current = "action movies"`
3. User clicks search again for "action movies"
4. Check: Is "action movies" === lastSearchRef.current? Yes → Skip API call
5. User searches for "comedy movies"
6. Check: Is "comedy movies" === lastSearchRef.current? No → Make API call

#### Component State Persistence - Real Example

**Problem**: Component needs to remember a timer or interval between renders
**Solution**: Store timer ID in `useRef`
**Code**: `const timeoutRef = useRef<NodeJS.Timeout>()`
**How it works**:

1. Set a timer: `timeoutRef.current = setTimeout(...)`
2. Component re-renders (timer ID is preserved)
3. Clean up timer: `clearTimeout(timeoutRef.current)`

---

## Performance Patterns

### Context Optimizations

#### AuthContext Memoization

```typescript
// CACHES: Function reference - persists across AuthProvider re-renders
// CHANGES: Never (empty deps) - BUT recreates if AuthProvider unmounts/remounts
// WITHOUT useCallback: New reference every re-render → useMemo recreates context → all auth consumers re-render
// WHY MATTERS: Prevents context recreation cascade
const checkAuthStatus = useCallback(() => {
  /* ... */
}, []);

// CACHES: Context value object - persists across AuthProvider re-renders
// CHANGES: When user, isLoading, or function references change - BUT recreates if AuthProvider unmounts/remounts
// WITHOUT useMemo: New object every re-render → all auth consumers re-render (NavBar, protected routes, etc.)
// WHY MATTERS: Prevents cascading re-renders across entire auth component tree
const contextValue = useMemo(
  () => ({
    /* ... */
  }),
  [user, isLoading, login, logout, checkAuthStatus]
);
```

### FiltersContext Memoization

```typescript
// CACHES: Context value object - persists across FiltersProvider re-renders
// CHANGES: When selectedGenres or selectedDate change (user clicks filters) - BUT recreates if FiltersProvider unmounts/remounts
// WITHOUT useMemo: New object every re-render → all filter consumers re-render (NavBar, Movies page, FiltersPopUp)
// WHY MATTERS: Prevents cascading re-renders across entire filter component tree
const contextValue = useMemo(
  () => ({
    /* ... */
  }),
  [selectedGenres, selectedDate]
);
```

### Component Optimizations

#### MovieCard Memoization

```typescript
// CACHES: Genres array - persists across MovieCard re-renders
// CHANGES: Never (movie.genres is static) - BUT recreates if MovieCard unmounts/remounts or movie prop changes
// WITHOUT useMemo: Array recreated on every re-render (hover, click, parent changes)
// WHY MATTERS: Minimal - string split is fast, mostly unnecessary optimization
const genresArray = useMemo(() => movie.genres.split(", "), [movie.genres]);
```

### Hook Optimizations

#### useMovies Hook Memoization

```typescript
// CACHES: fetchMovies function reference - persists across useMovies hook re-runs
// CHANGES: When activeTab changes (user switches tabs) - BUT recreates if useMovies hook unmounts/remounts
// WITHOUT useCallback: New reference every re-render → useEffect runs on every Home component re-render → unnecessary API calls
// WHY MATTERS: Prevents unnecessary API calls and useEffect re-runs
const fetchMovies = useCallback(async () => {
  /* ... */
}, [activeTab]);
```

---

## Development Patterns

### React Query Integration

**Setup**: 5-minute staleTime, 10-minute gcTime, 3 retries
**Usage**: Movie dates/times with dependency-based enabling
**Benefits**: Automatic caching, background refetching, deduplication

### Search Duplicate Prevention

**Pattern**: `useRef` to track last search string
**Implementation**: Skip `router.push` if identical query string
**Used by**: `useSearchLogic` for search functionality

### Error Handling

**API Pattern**: Try/catch with HTTP status checking
**Component Pattern**: Error boundaries for React error catching
**User Experience**: Graceful fallbacks with error messages

### CORS Configuration

**Location**: `SecurityConfig.java`
**Setup**: Allows localhost:3000-3002, all methods, credentials enabled
**Purpose**: Handle pre-flight OPTIONS requests before authentication

---

This reference provides specific, concise information about API usage, component behavior, hook functionality, and performance patterns without verbose explanations.
