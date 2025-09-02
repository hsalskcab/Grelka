// MobileDropdown.tsx - убираем кнопку закрытия
import { useEffect } from 'react';
import { SearchInput } from '@/shared/ui/searchInput';
import styles from './styles.module.css';

export interface MobileDropdownProps {
  searchQuery: string;
  searchResults: any[];
  onSearchChange: (value: string) => void;
  onSearchClear?: () => void;
  onSearchSubmit?: (value: string) => void;
  onClose?: () => void;
}

export const MobileDropdown = ({
  searchQuery,
  searchResults,
  onSearchChange,
  onSearchClear,
  onSearchSubmit,
  onClose
}: MobileDropdownProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* УБИРАЕМ шапку с кнопкой закрытия */}
        
        <div className={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
            onSearch={onSearchSubmit}
            placeholder="Поиск по товарам и брендам"
            autoFocus
            className={styles.searchInput}
          />
        </div>

        <div className={styles.results}>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className={styles.resultItem} onClick={onClose}>
                {result.title}
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              {searchQuery ? 'Ничего не найдено' : 'Начните вводить запрос'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};