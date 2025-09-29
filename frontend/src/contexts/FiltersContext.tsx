'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <FiltersContext.Provider value={{
      selectedGenres,
      setSelectedGenres,
      selectedDate,
      setSelectedDate
    }}>
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
