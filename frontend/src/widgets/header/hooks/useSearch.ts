// useSearch.ts - с функцией закрытия
import { useState, useCallback, useEffect } from 'react';
import { SearchCategory, PopularQuery, SearchResult } from '../lib/types/search';
import { searchService } from '../lib/api/searchService';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchCategory[]>([]);
  const [popularQueries, setPopularQueries] = useState<PopularQuery[]>([]);
  const [popularBrands, setPopularBrands] = useState<SearchResult[]>([]);
  const [isError, setIsError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Предзагрузка популярных items при монтировании
  useEffect(() => {
    loadPopularItems();
  }, []);

  // Поиск при изменении запроса
  useEffect(() => {
    if (query.trim() && isDropdownOpen) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        performSearch(query);
      }, 100);

      return () => clearTimeout(timeoutId);
    } else if (!query.trim() && isDropdownOpen) {
      setResults([]);
      setIsSearching(false);
    }
  }, [query, isDropdownOpen]);

  const loadPopularItems = async () => {
    try {
      const { queries, brands } = await searchService.getPopularItems();
      setPopularQueries(queries);
      setPopularBrands(brands);
    } catch (error) {
      setIsError(true);
      console.error('Failed to load popular items:', error);
    }
  };

  const performSearch = async (searchQuery: string) => {
    try {
      const searchResults = await searchService.search(searchQuery);
      setResults(searchResults);
      setIsSearching(false);
    } catch (error) {
      setIsError(true);
      setIsSearching(false);
      console.error('Search failed:', error);
    }
  };

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    setIsError(false);
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  }, [isDropdownOpen]);

  const handleSearchFocus = useCallback(() => {
    setIsDropdownOpen(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    // Ничего не делаем при blur
  }, []);

  // Функция закрытия дропдауна
  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsError(false);
    setIsSearching(false);
  }, []);

  return {
    query,
    results,
    popularQueries,
    popularBrands,
    isError,
    isDropdownOpen,
    isSearching,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    closeDropdown, // Добавляем функцию закрытия
    clearSearch,
    performSearch,
  };
};