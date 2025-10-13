# Cinema E-Booking System - Development Guide

## Table of Contents
1. [Project Structure](#project-structure)
2. [Backend API Endpoints](#backend-api-endpoints)
3. [Frontend Architecture](#frontend-architecture)
4. [Authentication System](#authentication-system)
5. [Data Flow](#data-flow)
6. [Key Components](#key-components)
7. [Hooks and Contexts](#hooks-and-contexts)

8. [React Query Integration](#react-query-integration)
9. [Performance Optimizations](#performance-optimizations)
10. [Database Schema](#database-schema)
11. [Development Workflow](#development-workflow)
12. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
SWE-Final-Proj/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/acm/cinema_ebkg_system/
│   │   ├── controller/         # REST API endpoints
│   │   ├── service/           # Business logic
│   │   ├── repository/        # Data access layer
│   │   ├── model/            # Entity classes
│   │   └── config/           # Configuration classes
│   └── src/main/resources/
│       └── application.properties
├── frontend/                  # Next.js React app
│   ├── src/
│   │   ├── app/              # Next.js 13+ app router
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React Context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service functions
│   │   └── constants/        # Static data
│   └── public/               # Static assets
└── db_backup/                # Database backup scripts
```

---

## Backend API Endpoints

### Authentication Endpoints (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

### Movie Endpoints (`/api/movies`)
- `GET /api/movies/now-playing` - Get all now playing movies
- `GET /api/movies/upcoming` - Get all upcoming movies
- `GET /api/movies/genres` - Get all available genres
- `GET /api/movies/search-now-playing` - Search now playing movies
- `GET /api/movies/search-upcoming` - Search upcoming movies
- `GET /api/movies/{movieId}` - Get specific movie details
- `GET /api/movies/{movieId}/dates` - Get available dates for movie
- `GET /api/movies/{movieId}/times` - Get showtimes for specific date

### User Endpoints (`/api/users`)
- `GET /api/users/` - Get all users (admin only)
- `GET /api/users/{userId}` - Get specific user
- `GET /api/users/{userId}/name` - Get user's name
- `PUT /api/users/{userId}` - Update user information

### Utility Endpoints (`/api`)
- `GET /api/hello` - Health check endpoint
- `GET /api/env` - Environment variables (development only)

---

## Frontend Architecture

### Page Structure (Next.js App Router)
```
app/
├── (auth)/                   # Authentication pages
│   └── auth/
│       ├── login/page.tsx
│       ├── register/page.tsx
│       └── forgot-pwd/page.tsx
├── (booking)/               # Booking flow pages
│   └── booking/
│       ├── (seats)/page.tsx
│       ├── ticket-age/page.tsx
│       ├── checkout/page.tsx
│       └── confirmation/page.tsx
├── (public)/                # Public pages
│   ├── page.tsx             # Homepage
│   ├── movies/page.tsx
│   └── promos/page.tsx
├── (admin)/                 # Admin pages
│   └── admin/
│       ├── page.tsx
│       ├── movies/page.tsx
│       ├── users/page.tsx
│       ├── pricing/page.tsx
│       └── promotions/page.tsx
├── (user)/                  # User account pages
│   └── user/
│       ├── profile/page.tsx
│       └── orders/page.tsx
└── layout.tsx               # Root layout with providers
```

### Component Organization
```
components/
├── common/                  # Reusable components across multiple pages
│   ├── navBar/             # Navigation components (NavBar, UserMenu, etc.)
│   ├── movies/             # Movie display components (MovieCard, SelectedMovie, etc.)
│   ├── promos/             # Promotion components (BigPromo, SmallPromo, etc.)
│   ├── genres/             # Genre display components (Genre, GenresSection)
│   ├── Footer.tsx          # Site footer
│   ├── PromoBanner.tsx     # Reusable promotional banner
│   ├── Notification.tsx    # Toast notifications
│   └── WhiteSeparator.tsx  # UI separator component
└── specific/               # Page-specific components
    ├── home/               # Homepage components (HeroSection, MovieTabsSection)
    ├── movies/             # Movies page components (FiltersPopUp, MovieSection)
    └── booking/            # Booking flow components (CinemaLayout, Seat components)
```

### Optimization Features
- **Lazy Loading**: Below-the-fold components loaded with `dynamic()`
- **Image Optimization**: Next.js `Image` component with blur placeholders
- **Data Caching**: Caching (API calls) + React Query for server state management
- **Code Splitting**: Automatic route-based code splitting
- **CSS Modules**: Scoped styling for component isolation

---

## Authentication System

### JWT Token Flow
1. **Registration/Login**: User submits credentials
2. **Server Validation**: Backend validates credentials against database
3. **Token Generation**: Server creates JWT access token
4. **Client Storage**: Token stored in localStorage (remember me) or sessionStorage
5. **API Requests**: Token sent in Authorization header for protected routes
6. **Token Refresh**: Client automatically refreshes expired tokens

### AuthContext Properties
```typescript
interface AuthContextType {
  user: User | null;           // Current user object
  isAuthenticated: boolean;    // Authentication status
  isLoading: boolean;         // Initial auth check status
  login: (email, password, rememberMe) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuthStatus: () => void;
}
```

### Registration Flow
The registration process is split into 3 steps with consistent dark mode styling:

#### Step 1: Account Credentials
- Email address validation
- Password strength validation (minimum 8 characters)
- Password confirmation matching
- Dark theme with glassmorphism styling

#### Step 2: Personal Information
- First name and last name (required)
- Phone number with validation
- Consistent styling with Step 1

#### Step 3: Optional Payment Method
- Card type selection (Visa, Mastercard, Amex, Discover)
- Card number input
- Expiration date and CVV
- Billing address (street, city, state)
- All fields are optional - users can skip payment setup
- Payment information is not sent to backend during registration

### RegistrationContext Properties
```typescript
interface RegistrationData {
  // Step 1
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2
  firstName: string;
  lastName: string;
  phoneNumber: string;
  
  // Step 3 - Payment Method (Optional)
  cardType?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
}
```

### Token Storage Strategy
- **Remember Me**: localStorage (persistent across browser sessions)
- **Session Only**: sessionStorage (cleared when browser closes)
- **Stateless**: Server doesn't store sessions, validates JWT signature only

---

## Data Flow

### Movie Data Flow
1. **Homepage Load**: `useMovies` hook checks cache first, then fetches now playing movies
2. **Tab Switch**: User clicks "Upcoming" → `useMovies` checks cache, fetches if needed
3. **Cache Hit**: Return visits use cached data (instant loading, no API call)
4. **Cache Expiry**: After 5 minutes, fresh data fetched from API
5. **Search**: User types in search → `useMovieSearch` hook handles search logic
6. **Filter**: User opens filters → `FiltersContext` manages filter state
7. **Results**: Filtered movies displayed via `MovieSection` component

### Booking Flow
1. **Movie Selection**: User clicks movie → navigates to seats page
2. **Seat Selection**: `useSeats` hook manages seat state
3. **Ticket Selection**: Seat IDs passed to ticket-age page via URL params
4. **Checkout**: User proceeds to checkout with selected seats and tickets

### Authentication Flow
1. **App Load**: `AuthContext` checks for existing tokens
2. **Token Validation**: If token exists, validates with `/api/auth/refresh`
3. **State Update**: Updates user state and authentication status
4. **UI Update**: NavBar shows appropriate login/user menu

---

## Key Components

### NavBar Component
- **Location**: `components/common/navBar/NavBar.tsx`
- **Purpose**: Main navigation with authentication state
- **Behavior**: 
  - Shows "Join" button when not authenticated
  - Shows user greeting and UserMenu when authenticated
  - Includes search functionality and filter popup

### MovieTabsSection Component
- **Location**: `components/specific/home/MovieTabsSection.tsx`
- **Purpose**: Handles movie category tabs (Now Playing/Upcoming)
- **State Management**: Uses `useMovies` hook for data fetching

### CinemaLayout Component
- **Location**: `components/specific/booking/CinemaLayout.tsx`
- **Purpose**: Displays cinema seating arrangement
- **Features**: 
  - Seat selection with visual feedback
  - Row numbering
  - Screen representation

### PromoBanner Component
- **Location**: `components/common/PromoBanner.tsx`
- **Purpose**: Reusable promotional banner
- **Usage**: Used in seats and ticket-age pages

### SelectedMovie Component (Modularized)
- **Location**: `components/common/movies/SelectedMovie.tsx`
- **Purpose**: Movie details popup with showtimes
- **Sub-components**:
  - `SelectedMovieInfo.tsx` - Movie poster and basic info
  - `SelectedMovieTrailer.tsx` - Embedded trailer
  - `SelectedMovieShowtimes.tsx` - Date/time selection
  - `SelectedMovieCredits.tsx` - Cast and crew
  - `SelectedMovieBookButton.tsx` - Booking button

---

## Hooks and Contexts

### Custom Hooks
- **`useMovies`**: Fetches and manages movie data with in-memory caching (5-minute expiry)
- **`useGenres`**: Fetches available movie genres with caching (30-minute expiry)
- **`useMovieSearch`**: Handles movie search functionality
- **`useSearchLogic`**: Manages search input and filter popup state
- **`useSeats`**: Manages seat selection state and logic

### Caching Strategy
```typescript
// Cache structure for movies
const moviesCache = {
  nowplaying: BackendMovie[],     // Cached now playing movies
  upcoming: BackendMovie[],       // Cached upcoming movies
  lastFetch: {
    nowplaying: number,           // Timestamp of last fetch
    upcoming: number
  }
};

// Cache duration: 5 minutes for movies, 30 minutes for genres
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```

### Hook Execution Flow
1. **Hook Called**: `const { movies } = useMovies(activeTab)`
2. **State Initialization**: Check cache, return cached data if fresh
3. **useEffect Trigger**: fetchMovies runs if cache is stale
4. **Cache Check**: fetchMovies checks cache again before API call
5. **API Call**: Only if cache is expired or empty
6. **Cache Update**: Store fresh data and timestamp
7. **State Update**: Update component state with new data

### React Contexts
- **`AuthContext`**: Global authentication state and methods
- **`FiltersContext`**: Movie filter state and methods
- **`RegistrationContext`**: Registration form state (if used)

### Context Usage Pattern
```typescript
// In component
const { user, isAuthenticated, login, logout } = useAuth();
const { searchQuery, setSearchQuery } = useSearchLogic();

// Context provides:
// - Global state management
// - Automatic re-renders when state changes
// - Centralized business logic
```

---

## React Query Integration

### Setup
React Query is integrated at the root level via `QueryProvider` in `contexts/QueryProvider.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,        // 10 minutes (was cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Usage in Components
React Query is used in `SelectedMovie` components for fetching movie dates and showtimes:

```typescript
const {
  data: availableDates = [],
  isLoading: datesLoading,
  error: datesError
} = useQuery({
  queryKey: ['movie-dates', movie.movie_id],
  queryFn: async () => {
    const url = buildUrl(endpoints.movies.dates(movie.movie_id));
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return resp.json();
  },
  staleTime: 5 * 60 * 1000,
});
```

### Benefits Over Custom Hooks
- **Automatic Caching**: Server state cached automatically
- **Background Refetching**: Data stays fresh without user interaction
- **Loading States**: Built-in loading, error, and success states
- **Deduplication**: Identical requests are deduplicated automatically
- **Devtools**: React Query Devtools for debugging (development only)

## Duplicate API Request Prevention

### Problem
When users pressed Enter multiple times in the movie search, it triggered multiple identical GET requests to the API, causing unnecessary network traffic and potential race conditions.

### Root Cause Analysis
The issue occurred because:
1. **searchParams Object Recreation**: `useSearchParams()` returns a new object reference on every render, even for identical query parameters
2. **useEffect Dependency Chain**: The `useMovieSearch` hook's `useEffect` depended on `searchParams`, causing it to run on every render
3. **Component Re-mounting**: React's Strict Mode and Suspense boundaries could cause component re-mounting, resetting duplicate prevention mechanisms

### Solution Implementation

#### 1. Single Layer Prevention in useSearchLogic
```typescript
// useSearchLogic.ts
const lastSearchRef = useRef<string>('');

const handleSearch = () => {
  const params = new URLSearchParams();
  // ... build search parameters ...
  const queryString = params.toString();

  // Prevent duplicate router.push calls
  if (queryString === lastSearchRef.current) {
    console.log('Skipping duplicate search');
    return;
  }
  
  lastSearchRef.current = queryString;
  router.push(`/movies${queryString ? `?${queryString}` : ''}`);
};
```

#### 2. Simplified useMovieSearch Hook
```typescript
// useMovieSearch.ts - Simplified without duplicate prevention
useEffect(() => {
  const title = searchParams.get('title');
  const genres = searchParams.get('genres');
  // ... other params ...

  if (!title && !genres && !month && !day && !year) {
    setNowPlayingMovies([]);
    setUpcomingMovies([]);
    return;
  }

  // Direct fetch logic without useCallback or AbortController
  const fetchNowPlaying = async () => { /* ... */ };
  const fetchUpcoming = async () => { /* ... */ };

  fetchNowPlaying();
  fetchUpcoming();
}, [searchParams]);
```

### Why This Approach Works

#### 1. Prevention at the Source
- **Single Responsibility**: Only `useSearchLogic` prevents duplicate searches
- **Early Exit**: Duplicate `router.push` calls are blocked before navigation occurs
- **No Redundancy**: Removed duplicate prevention from `useMovieSearch` to avoid conflicts

#### 2. Simplified Dependencies
- **Direct useEffect**: No `useCallback` wrapper that could cause dependency issues
- **searchParams Dependency**: React handles `searchParams` changes correctly
- **Clean Logic**: Straightforward fetch logic without complex memoization

#### 3. Performance Benefits
- **Reduced Network Traffic**: Identical searches are prevented at the router level
- **Faster UI Response**: No unnecessary API calls for duplicate searches
- **Better User Experience**: Users can press Enter multiple times without issues

### Technical Details

#### useRef for Persistence
```typescript
const lastSearchRef = useRef<string>('');
```
- **Persists Across Renders**: `useRef` maintains the last search string between renders
- **Component Scope**: Each component instance has its own ref
- **No Re-render Trigger**: Changing ref.current doesn't cause component re-renders

#### String Comparison Strategy
```typescript
if (queryString === lastSearchRef.current) {
  return; // Skip duplicate
}
```
- **Fast Comparison**: String equality check is very fast
- **Reliable Detection**: Identical query strings are guaranteed to be equal
- **Simple Logic**: Easy to understand and debug

### Alternative Approaches Considered

#### 1. AbortController (Rejected)
```typescript
// This approach was too complex and caused issues
const abortController = useRef<AbortController | null>(null);
```
- **Complexity**: Required managing controller lifecycle
- **Race Conditions**: Could cause issues with component unmounting
- **Overkill**: Too much complexity for the simple duplicate prevention needed

#### 2. useCallback with Dependencies (Rejected)
```typescript
// This approach caused more problems than it solved
const fetchSearchResults = useCallback(async () => {
  // fetch logic
}, [searchParams]); // searchParams changes every render
```
- **Dependency Issues**: `searchParams` object reference changes on every render
- **Unnecessary Recreations**: Function would recreate on every render anyway
- **Performance Overhead**: useCallback overhead without benefits

### Best Practices Applied

1. **Single Source of Truth**: Only one place handles duplicate prevention
2. **Simple Solutions**: Prefer simple, reliable solutions over complex optimizations
3. **Early Prevention**: Stop duplicates at the source (router level) rather than at the API level
4. **Clear Documentation**: Well-documented code with specific comments about what each optimization does

---

## Performance Optimizations

### useMemo and useCallback Usage

#### AuthContext Optimizations
```typescript
// CACHES: Function reference (not behavior) - persists across AuthProvider re-renders
// CHANGES: Never (empty deps) - BUT will recreate if AuthProvider component unmounts/remounts
// WITHOUT useCallback: New reference every AuthProvider re-render → useMemo recreates context → all auth consumers re-render
// WHY MATTERS: Prevents context recreation cascade
const checkAuthStatus = useCallback(() => { /* ... */ }, []);

// CACHES: Context value object { user, isAuthenticated, isLoading, login, logout, checkAuthStatus } - persists across AuthProvider re-renders
// CHANGES: When user, isLoading, or function references change - BUT will recreate if AuthProvider component unmounts/remounts
// WITHOUT useMemo: New object every AuthProvider re-render → all auth consumers re-render (NavBar, protected routes, etc.)
// WHY MATTERS: Prevents cascading re-renders across entire auth component tree
const contextValue = useMemo(() => ({ /* ... */ }), [user, isLoading, login, logout, checkAuthStatus]);
```

#### FiltersContext Optimizations
```typescript
// CACHES: Context value object { selectedGenres, setSelectedGenres, selectedDate, setSelectedDate } - persists across FiltersProvider re-renders
// CHANGES: When selectedGenres or selectedDate change (user clicks filters) - BUT will recreate if FiltersProvider component unmounts/remounts
// WITHOUT useMemo: New object every FiltersProvider re-render → all filter consumers re-render (NavBar, Movies page, FiltersPopUp)
// WHY MATTERS: Prevents cascading re-renders across entire filter component tree
const contextValue = useMemo(() => ({ /* ... */ }), [selectedGenres, selectedDate]);
```

#### Component-Level Optimizations
```typescript
// CACHES: Genres array ["Action", "Drama", "Thriller"] - persists across MovieCard re-renders
// CHANGES: Never (movie.genres is static) - BUT will recreate if MovieCard component unmounts/remounts or movie prop changes
// WITHOUT useMemo: Array recreated on every MovieCard re-render (hover, click, parent changes)
// WHY MATTERS: Minimal - string split is fast, mostly unnecessary optimization
const genresArray = useMemo(() => movie.genres.split(', '), [movie.genres]);
```

#### Hook-Level Optimizations
```typescript
// CACHES: fetchMovies function reference - persists across useMovies hook re-runs
// CHANGES: When activeTab changes (user switches tabs) - BUT will recreate if useMovies hook unmounts/remounts
// WITHOUT useCallback: New reference every useMovies re-render → useEffect runs on every Home component re-render → unnecessary API calls
// WHY MATTERS: Prevents unnecessary API calls and useEffect re-runs
const fetchMovies = useCallback(async () => { /* ... */ }, [activeTab]);
```

### Optimization Constraints and Limits

#### What Gets Cached vs. What Gets Recreated
- **useMemo**: Caches the **return value** (result of computation) - persists across re-renders but recreates when dependencies change or component unmounts/remounts
- **useCallback**: Caches the **function reference** (pointer to function) - persists across re-renders but recreates when dependencies change or component unmounts/remounts
- **useEffect**: Doesn't cache anything - runs when dependencies change or on mount/cleanup

#### When Optimizations Are Lost
1. **Component Unmount/Remount**: All cached values are lost when component unmounts
2. **Dependency Changes**: Cached values are recreated when dependencies change
3. **Parent Re-renders**: If parent component re-renders and passes new props, child component may remount
4. **Navigation**: Page navigation may cause component trees to unmount/remount

#### Performance Impact Assessment
- **Context Optimizations**: High impact - prevents cascading re-renders across entire component trees
- **Function Memoization**: Medium impact - prevents unnecessary API calls and useEffect re-runs
- **Array/Object Memoization**: Low impact - mostly unnecessary for simple computations

### Image Optimization
All `Image` components using `fill` prop include `sizes` prop for optimal loading:
```typescript
<Image
  src={movie.poster_link}
  alt={movie.title}
  className="object-cover"
  fill
  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
/>
```

---

## Database Schema

### Movies Table
```sql
CREATE TABLE movies (
    movie_id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,        -- 'NOW_PLAYING' or 'UPCOMING'
    genres TEXT NOT NULL,               -- Comma-separated genres
    rating VARCHAR(10) NOT NULL,        -- 'G', 'PG', 'PG-13', 'R', 'NC-17'
    release_date DATE NOT NULL,
    synopsis TEXT NOT NULL,
    trailer_link TEXT NOT NULL,
    poster_link TEXT NOT NULL,
    cast_names TEXT NOT NULL,           -- Comma-separated cast
    directors TEXT NOT NULL,            -- Comma-separated directors
    producers TEXT NOT NULL             -- Comma-separated producers
);
```

### Users Table
```sql
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    state VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Development Workflow

### Backend Development
1. **Start Spring Boot**: `mvn spring-boot:run` (port 8080)
2. **Database**: Connected to Neon PostgreSQL
3. **API Testing**: Use Postman or curl commands
4. **CORS**: Configured for frontend communication

### Frontend Development
1. **Start Next.js**: `npm run dev` (port 3000)
2. **Environment**: Set `NEXT_PUBLIC_API_URL=http://localhost:8080/api`
3. **Hot Reload**: Automatic refresh on file changes
4. **TypeScript**: Full type safety throughout

### Database Management
1. **Backup**: Use scripts in `db_backup/` directory
2. **Restore**: Automated restore with cleanup
3. **Migrations**: Flyway for schema versioning (currently disabled)

### Common Development Tasks

#### Adding New API Endpoint
1. Create controller method in appropriate controller class
2. Add service layer method for business logic
3. Add repository method if database access needed
4. Test with Postman or curl
5. Update frontend service if needed

#### Adding New React Component
1. Create component file in appropriate directory
2. Add TypeScript interfaces for props
3. Implement component logic and JSX
4. Add CSS modules for styling
5. Import and use in parent component

#### Adding New Page
1. Create page.tsx file in app router structure
2. Add necessary imports and components
3. Implement page logic with hooks if needed
4. Add navigation links in NavBar if public page

#### Adding Caching to New Hook
1. Create cache object outside component (persists between renders)
2. Add cache check in useState initializer
3. Add cache check in fetch function
4. Update cache after successful API call
5. Set appropriate cache duration based on data volatility

### Environment Variables
```bash
# Backend (.env or application.properties)
DATABASE_URL=jdbc:postgresql://your-neon-host:5432/your-database
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
JWT_SECRET=your-jwt-secret

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Testing Authentication
```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","firstName":"John","lastName":"Doe","phoneNumber":"1234567890","state":"CA","country":"USA"}'

# Login user
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# Test protected endpoint
curl -X GET http://localhost:8080/api/movies/now-playing \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Troubleshooting

### Common Issues

#### CORS Errors
- **Cause**: Frontend and backend running on different ports
- **Solution**: Check SecurityConfig CORS configuration in backend
- **Verification**: Ensure `allowedOrigins` includes `http://localhost:3000`

#### Authentication Fails
- **Cause**: JWT token validation issues
- **Solution**: Verify JWT_SECRET matches between frontend/backend
- **Debug**: Check browser dev tools Network tab for 401/403 responses

#### Database Connection
- **Cause**: Incorrect DATABASE_URL or credentials
- **Solution**: Check DATABASE_URL format and credentials in application.properties
- **Format**: `jdbc:postgresql://host:port/database`

#### Token Expired
- **Cause**: JWT token has expired
- **Solution**: Implement token refresh logic in AuthContext
- **Behavior**: User should be automatically logged out and redirected to login

#### Component Not Rendering
- **Cause**: Missing imports or context providers
- **Solution**: Check for missing imports or ensure component is wrapped in required providers
- **Debug**: Use React DevTools to inspect component tree

#### Multiple API Requests
- **Cause**: useEffect dependencies changing on every render
- **Solution**: Use useCallback for functions in useEffect dependencies
- **Prevention**: Implement duplicate request prevention with useRef

#### Movie Popup Disappearing
- **Cause**: URL synchronization conflicts with popup state
- **Solution**: Remove popstate event listeners and window.history manipulation
- **Fix**: Use simple state management without URL sync

### Debug Tips
1. **Backend Logs**: Check Spring Boot console for errors and request logs
2. **Frontend Console**: Check browser dev tools for API errors and React warnings
3. **Network Tab**: Monitor API requests and responses for status codes
4. **React DevTools**: Inspect component state, props, and re-render causes
5. **Database**: Use Neon dashboard to verify data integrity
6. **React Query Devtools**: Use React Query Devtools to inspect cache state and query status

### Performance Debugging
1. **React DevTools Profiler**: Identify components causing unnecessary re-renders
2. **Console Warnings**: Address React warnings about missing dependencies
3. **Network Tab**: Monitor for duplicate API requests
4. **Memory Usage**: Check for memory leaks in long-running applications

## Component Modularization

### Authentication Components
Created reusable authentication components in `src/components/common/auth/`:

#### AuthFormContainer
- **Purpose**: Wraps authentication forms with consistent styling and layout
- **Features**: NavBar integration, glassmorphism design, responsive centering
- **Usage**: Used in login, register, and registration steps

#### AuthInput
- **Purpose**: Standardized input field component for authentication forms
- **Features**: Error handling, consistent styling, accessibility support
- **Props**: `id`, `label`, `type`, `value`, `onChange`, `placeholder`, `error`, `required`, `disabled`

#### AuthButton
- **Purpose**: Standardized button component for authentication actions
- **Features**: Loading states, multiple variants (primary, secondary, transparent)
- **Props**: `type`, `onClick`, `disabled`, `loading`, `variant`, `children`

### Registration Flow Updates

#### Payment Method Integration
- **Step 3**: Now includes optional payment method input
- **Fields**: Card type, card number, expiration date, billing address
- **Security**: CVV excluded from backend transmission for security
- **Optional**: Users can skip payment method and create account

#### Backend Integration
- **Updated Interface**: `RegisterRequest` includes optional payment fields
- **Security**: CVV never sent to backend (handled separately in payment service)
- **Data Flow**: Payment info sent to backend if provided, otherwise defaults to empty

#### Styling Consistency
- **All Steps**: Consistent dark mode glassmorphism design
- **Centering**: Proper vertical and horizontal centering accounting for navbar
- **Responsive**: Mobile-friendly layout with proper spacing

### Component Organization
- **Common Components**: Reusable across multiple pages (`AuthFormContainer`, `AuthInput`, `AuthButton`)
- **Specific Components**: Page-specific functionality remains in respective folders
- **File Structure**: Organized by feature rather than component type

This guide provides a comprehensive overview of the project structure, API endpoints, authentication system, performance optimizations, component architecture, and development workflow. Use it as a reference when working on the codebase or onboarding new team members.