'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

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

  // CACHES: Context value object { selectedGenres, setSelectedGenres, selectedDate, setSelectedDate } - persists across FiltersProvider re-renders
  // CHANGES: When selectedGenres or selectedDate change (user clicks filters) - BUT will recreate if FiltersProvider component unmounts/remounts
  // WITHOUT useMemo: New object every FiltersProvider re-render → all filter consumers re-render (NavBar, Movies page, FiltersPopUp)
  // WHY MATTERS: Prevents cascading re-renders across entire filter component tree
  const contextValue = useMemo(() => ({
    selectedGenres,
    setSelectedGenres,
    selectedDate,
    setSelectedDate
  }), [selectedGenres, selectedDate]);

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
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
