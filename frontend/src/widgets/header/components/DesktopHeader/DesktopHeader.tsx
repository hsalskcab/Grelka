// DesktopHeader.tsx - с закрытием дропдауна при клике на логотип
import { LogoIcon } from '@/shared/ui/icons';
import { SearchInput } from '@/shared/ui/searchInput';
import { SearchDropdown } from '../SearchDropdown';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { SearchCategory, PopularQuery, SearchResult } from '../../lib/types/search';

export interface DesktopHeaderProps {
  searchQuery: string;
  searchResults: SearchCategory[];
  popularQueries: PopularQuery[];
  popularBrands: SearchResult[];
  isError: boolean;
  isDropdownOpen: boolean;
  isSearching: boolean;
  onSearchChange: (value: string) => void;
  onSearchClear?: () => void;
  onSearchSubmit?: (value: string) => void;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  onResultClick: (result: SearchResult) => void;
  onQueryClick: (query: string) => void;
  onLogoClick: () => void; // Новый пропс для клика на логотип
}

export const DesktopHeader = ({
  searchQuery,
  searchResults,
  popularQueries,
  popularBrands,
  isError,
  isDropdownOpen,
  isSearching,
  onSearchChange,
  onSearchClear,
  onSearchSubmit,
  onSearchFocus,
  onSearchBlur,
  onResultClick,
  onQueryClick,
  onLogoClick, // Получаем функцию клика на логотип
}: DesktopHeaderProps) => {
  return (
    <header className={styles.desktopHeader}>
      <div className={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          onClear={onSearchClear}
          onSearch={onSearchSubmit}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          placeholder="Поиск по товарам и брендам"
          className={styles.searchInput}
        />
        
        <SearchDropdown
          query={searchQuery}
          searchResults={searchResults}
          popularQueries={popularQueries}
          popularBrands={popularBrands}
          isError={isError}
          isVisible={isDropdownOpen}
          isSearching={isSearching}
          onItemClick={onResultClick}
          onQueryClick={onQueryClick}
        />
      </div>
      
      <div className={styles.logoSection}>
        <Link 
          to="/" 
          className={styles.logoLink}
          onClick={onLogoClick} // Добавляем обработчик клика
        >
          <LogoIcon />
        </Link>
      </div>
    </header>
  );
};