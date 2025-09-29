# 🎬 ACM Cinema App - Developer Flow Guide

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [State Management](#state-management)
3. [Data Flow](#data-flow)
4. [Component Structure](#component-structure)
5. [API Integration](#api-integration)
6. [Search & Filter System](#search--filter-system)
7. [Key Files & Their Roles](#key-files--their-roles)
8. [Development Workflow](#development-workflow)

---

## 🏗️ Architecture Overview

This is a **Next.js 14** application with **App Router** that provides a cinema booking system. The app follows a **component-based architecture** with **global state management** for filters and **local state** for component-specific data.

### Core Technologies:
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Spring Boot (separate service)
- **State Management**: React Context API
- **Icons**: Phosphor Icons
- **Fonts**: Google Fonts (Afacad, Red Rose, Pacifico)

---

## 🔄 State Management

### Global State (FiltersContext)
```typescript
// Located: /contexts/FiltersContext.tsx
interface FiltersContextType {
  selectedGenres: Set<string>;        // User's selected genres
  setSelectedGenres: (genres) => void;
  selectedDate: {                     // User's selected release date
    month: string;
    day: string;
    year: string;
  };
  setSelectedDate: (date) => void;
}
```

**Purpose**: Shared filter state between NavBar and Movies page so both can control the same popup and maintain selections.

**Provider**: Wraps the entire app in `layout.tsx`:
```typescript
<FiltersProvider>
  {children}
</FiltersProvider>
```

### Local State Examples
- **NavBar**: `searchQuery`, `isFiltersOpen`
- **MoviesPage**: `nowPlayingMovies`, `upcomingMovies`, `isLoadingNowPlaying`, `isLoadingUpcoming`
- **FiltersPopUp**: `allGenres`, `isLoadingGenres`, `hasFetchedGenres`

---

## 🌊 Data Flow

### 1. **App Initialization**
```
layout.tsx → FiltersProvider → All Pages
```

### 2. **Search Flow**
```
User types in search → Local state updates → User clicks search → 
URL params built → Router navigates → Movies page reads params → 
API calls made → Results displayed
```

### 3. **Filter Flow**
```
User clicks filter button → FiltersPopUp opens → Genres fetched from API → 
User selects filters → Filters stored in global context → 
User clicks search → Filters included in API call
```

### 4. **Movie Data Flow**
```
Page loads → Read URL params → Make API calls to backend → 
Transform data → Update local state → Render components
```

---

## 🧩 Component Structure

### Page Components
```
app/
├── (public)/
│   ├── page.tsx              # Home page with genres and promotions
│   └── movies/
│       └── page.tsx          # Movies search results page
└── layout.tsx                # Root layout with FiltersProvider
```

### Common Components
```
components/
├── common/
│   ├── navBar/
│   │   ├── NavBar.tsx        # Main navigation with search
│   │   ├── UserMenu.tsx      # User dropdown menu
│   │   └── UserIcon.tsx      # User profile icon
│   ├── movies/
│   │   └── MovieCardsGrid.tsx # Grid display for movies
│   ├── genres/
│   │   ├── GenresSection.tsx # Home page genres display
│   │   └── Genre.tsx         # Individual genre button
│   └── promos/
│       └── SmallPromo.tsx    # Promotion cards
└── specific/
    └── movies/
        ├── FiltersPopUp.tsx  # Filter selection popup
        ├── FiltersDate.tsx   # Date picker component
        └── FiltersGenreButton.tsx # Genre selection button
```

---

## 🔌 API Integration

### Configuration
```typescript
// Located: /config/api.ts
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  endpoints: {
    movies: {
      nowPlaying: '/api/movies/now-playing',
      upcoming: '/api/movies/upcoming',
      genres: '/api/movies/genres',
      searchNowPlaying: '/api/movies/search-now-playing',
      searchUpcoming: '/api/movies/search-upcoming',
      // ... more endpoints
    }
  }
};
```

### API Call Pattern
```typescript
// Example: Fetching movies with search parameters
const fetchMovies = async (searchParams) => {
  const url = buildUrl(endpoints.movies.searchNowPlaying);
  const response = await fetch(`${url}?${searchParams.toString()}`);
  const data = await response.json();
  return data;
};
```

### Backend Communication
- **Base URL**: `http://localhost:8080` (configurable via env)
- **Search Parameters**: `title`, `genres`, `month`, `day`, `year`
- **Response Format**: JSON array of movie objects

---

## 🔍 Search & Filter System

### Search Implementation
1. **NavBar Search**: 
   - User types → `searchQuery` state updates
   - On search click/Enter → Build URL params → Navigate to `/movies`

2. **Movies Page Search**:
   - User types → `searchQuery` state updates
   - On search click → Build URL params → Update current page
   - **Real-time search**: Updates results as user types (debounced)

### Filter System
1. **Filter Button**: Opens `FiltersPopUp` (same component used by both NavBar and Movies page)
2. **Genre Selection**: Fetches genres from API, allows multiple selection
3. **Date Selection**: Month/Day/Year dropdowns
4. **State Persistence**: Filters remain selected even when popup closes
5. **Search Integration**: Filters are included in search API calls

### URL Parameter Structure
```
/movies?title=godzilla&genres=Action,Sci-Fi&month=3&day=15&year=2024
```

---

## 📁 Key Files & Their Roles

### Core Application Files
| File | Purpose | Key Features |
|------|---------|--------------|
| `layout.tsx` | Root layout | Wraps app with FiltersProvider, font configuration |
| `page.tsx` | Home page | Displays genres, promotions, featured movies |
| `movies/page.tsx` | Movies page | Search results, filter integration, dual movie sections |

### State Management
| File | Purpose | Key Features |
|------|---------|--------------|
| `FiltersContext.tsx` | Global filter state | Shared between NavBar and Movies page |
| `api.ts` | API configuration | Centralized endpoint management |

### Components
| File | Purpose | Key Features |
|------|---------|--------------|
| `NavBar.tsx` | Main navigation | Search bar, filter button, user menu |
| `FiltersPopUp.tsx` | Filter selection | Genre/date selection, API integration |
| `MovieCardsGrid.tsx` | Movie display | Grid layout for movie cards |
| `GenresSection.tsx` | Home page genres | Horizontal scrollable genre list |

---

## 🚀 Development Workflow

### Adding New Features
1. **New API Endpoint**: Add to `config/api.ts`
2. **New Component**: Create in appropriate folder (`common/` or `specific/`)
3. **New State**: Add to existing context or create new one
4. **New Page**: Create in `app/` directory

### State Management Best Practices
- **Global State**: Use for data shared between multiple components
- **Local State**: Use for component-specific data
- **Context**: Wrap providers in `layout.tsx` for app-wide access

### API Integration Pattern
```typescript
// 1. Define endpoint in config/api.ts
// 2. Create fetch function in component
// 3. Handle loading/error states
// 4. Update local state with results
// 5. Render data in component
```

### Component Communication
- **Parent → Child**: Props
- **Child → Parent**: Callback functions
- **Sibling Components**: Shared context
- **Page Navigation**: Next.js router with URL parameters

---

## 🔧 Common Development Tasks

### Adding a New Filter Type
1. Update `FiltersContext.tsx` interface
2. Add UI component in `FiltersPopUp.tsx`
3. Update search parameter building in NavBar and Movies page
4. Update API calls to include new parameter

### Adding a New Movie Section
1. Add new state in Movies page
2. Create API call function
3. Add loading state
4. Render new section in component

### Modifying Search Behavior
1. Update search handlers in NavBar and Movies page
2. Modify URL parameter building
3. Update API call parameters
4. Test with different search combinations

---

## 🐛 Debugging Tips

### State Issues
- Check if component is wrapped in `FiltersProvider`
- Verify context usage with `useFilters()` hook
- Check console for context errors

### API Issues
- Verify backend is running on `localhost:8080`
- Check network tab for failed requests
- Validate API endpoint URLs in `config/api.ts`

### Component Issues
- Check import paths (use `@/` alias for src directory)
- Verify component props and interfaces
- Check for TypeScript errors in console

---

## 📚 Key Concepts Summary

1. **Global State**: Filters are shared between NavBar and Movies page
2. **API Integration**: Centralized configuration with environment variables
3. **Search System**: URL-based search with real-time updates
4. **Component Reuse**: Same filter popup used in multiple places
5. **State Persistence**: Filters remain selected across navigation
6. **Responsive Design**: Mobile-first approach with Tailwind CSS
7. **Type Safety**: Full TypeScript implementation with interfaces

This architecture provides a scalable, maintainable codebase with clear separation of concerns and efficient state management.
