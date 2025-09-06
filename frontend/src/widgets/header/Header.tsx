// Header.tsx - с закрытием по Esc
'use client';

import { useRef, useEffect } from 'react';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { DesktopHeader } from './components/DesktopHeader';
import { useSearch } from './hooks/useSearch';
import styles from './styles.module.css';

export const Header = () => {
  const {
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
    clearSearch,
    performSearch,
    closeDropdown,
  } = useSearch();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const headerRef = useRef<HTMLDivElement>(null);

  const handleResultClick = (result: any) => {
    console.log('Clicked result:', result);
    closeDropdown();
  };

  const handleQueryClick = (queryText: string) => {
    handleSearchChange(queryText);
    performSearch(queryText);
  };

  const handleSearchSubmit = (value: string) => {
    console.log('Search submitted:', value);
    performSearch(value);
  };

  const handleLogoClick = () => {
    closeDropdown();
  };

  // Обработчик клика вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    // Обработчик нажатия клавиши Esc
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, closeDropdown]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Overlay для затемнения фона */}
      {isDropdownOpen && (
        <div 
          className={styles.searchOverlay}
          onClick={closeDropdown}
        />
      )}
      
      <div ref={headerRef} className={styles.headerWrapper}>
        <div className="container">
          <DesktopHeader
            searchQuery={query}
            searchResults={results}
            popularQueries={popularQueries}
            popularBrands={popularBrands}
            isError={isError}
            isDropdownOpen={isDropdownOpen}
            isSearching={isSearching}
            onSearchChange={handleSearchChange}
            onSearchClear={clearSearch}
            onSearchSubmit={handleSearchSubmit}
            onSearchFocus={handleSearchFocus}
            onSearchBlur={handleSearchBlur}
            onResultClick={handleResultClick}
            onQueryClick={handleQueryClick}
            onLogoClick={handleLogoClick}
          />
        </div>
      </div>
    </>
  );
};