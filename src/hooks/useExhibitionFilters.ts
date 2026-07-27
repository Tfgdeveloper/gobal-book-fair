import { useMemo, useState } from "react";
import { EXHIBITIONS, type Exhibition } from "../data/adaptExhibitions";

export const ALL_COUNTRIES = "All countries";
export const ALL_MONTHS = "Any month";
export const ALL_CATEGORIES = "All categories";

export interface ExhibitionFilters {
  country: string;
  month: string;
  category: string;
  query: string;
}

const DEFAULT_FILTERS: ExhibitionFilters = {
  country: ALL_COUNTRIES,
  month: ALL_MONTHS,
  category: ALL_CATEGORIES,
  query: "",
};

export interface UseExhibitionFiltersResult {
  filters: ExhibitionFilters;
  setCountry: (country: string) => void;
  setMonth: (month: string) => void;
  setCategory: (category: string) => void;
  setQuery: (query: string) => void;
  reset: () => void;
  filtered: Exhibition[];
  activeFilterCount: number;
}

export function useExhibitionFilters(): UseExhibitionFiltersResult {
  const [filters, setFilters] = useState<ExhibitionFilters>(DEFAULT_FILTERS);

  const setCountry = (country: string) => setFilters((f) => ({ ...f, country }));
  const setMonth = (month: string) => setFilters((f) => ({ ...f, month }));
  const setCategory = (category: string) => setFilters((f) => ({ ...f, category }));
  const setQuery = (query: string) => setFilters((f) => ({ ...f, query }));
  const reset = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return EXHIBITIONS.filter((e) => {
      if (filters.country !== ALL_COUNTRIES && e.country !== filters.country) return false;
      if (filters.month !== ALL_MONTHS && e.monthLabel !== filters.month) return false;
      if (filters.category !== ALL_CATEGORIES && !e.categories.includes(filters.category)) return false;

      if (q) {
        const haystack = `${e.title} ${e.city} ${e.country} ${e.venue}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [filters]);

  const activeFilterCount =
    (filters.country !== ALL_COUNTRIES ? 1 : 0) +
    (filters.month !== ALL_MONTHS ? 1 : 0) +
    (filters.category !== ALL_CATEGORIES ? 1 : 0) +
    (filters.query.trim() ? 1 : 0);

  return { filters, setCountry, setMonth, setCategory, setQuery, reset, filtered, activeFilterCount };
}