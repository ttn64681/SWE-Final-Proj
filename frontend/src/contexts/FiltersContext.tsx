'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import FiltersPopUp from '@/components/specific/movies/FiltersPopUp';

// Shared filter state that both NavBar and Movies page can access
// This allows both filter buttons to control the same popup and maintain state
interface FiltersContextType {
  selectedGenres: Set<string>;
  setSelectedGenres: (genres: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  selectedDate: {
    month: string;
    day: string;
    year: string;
  };
  setSelectedDate: (date: {
    month: string;
    day: string;
    year: string;
  }) => void;
  // Global popup state
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  // Reset function
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

// Wrapper component that provides filter state to all child components
export function FiltersProvider({ children }: { children: ReactNode }) {
  
  // Track which genres user has selected (can select multiple)
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  
  // Track the release date user wants to filter by
  const [selectedDate, setSelectedDate] = useState({
    month: '',
    day: '',
    year: ''
  });

  // Global popup state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Reset function to clear all filters
  const resetFilters = () => {
    setSelectedGenres(new Set());
    setSelectedDate({
      month: '',
      day: '',
      year: ''
    });
  };

  // CACHES: Context value object - persists across FiltersProvider re-renders
  // CHANGES: When selectedGenres, selectedDate, or isFiltersOpen change
  // WITHOUT useMemo: New object every FiltersProvider re-render → all filter consumers re-render
  // WHY MATTERS: Prevents cascading re-renders across entire filter component tree
  const contextValue = useMemo(() => ({
    selectedGenres,
    setSelectedGenres,
    selectedDate,
    setSelectedDate,
    isFiltersOpen,
    setIsFiltersOpen,
    resetFilters
  }), [selectedGenres, selectedDate, isFiltersOpen]);

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
      {/* 
        GLOBAL FILTERS POPUP 
        Portal:
        - Renders popup directly into document.body (outside component tree)
        - Industry standard for global UI elements apparently :O
        
        Why typeof window check?
        - Just in case Filters popup is rendered on server side (already set false by default)
        - Next.js renders on server first (SSR), where 'window' doesn't exist
        - Portal only works in browser, so we check if we're client-side
        - Prevents hydration mismatches between server and client
      */}
      {typeof window !== 'undefined' && createPortal(
        <FiltersPopUp 
          isClosed={!isFiltersOpen} 
          setIsClosed={(closed) => setIsFiltersOpen(!closed)}
        />,
        document.body
      )}
    </FiltersContext.Provider>
  );
}

// Hook to access filter state from any component
export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
}
