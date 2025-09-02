// SearchDropdown.tsx - без кнопки закрытия
import { SearchCategory as SearchCategoryType, PopularQuery, SearchResult } from '../../lib/types/search';
import { SearchCategory } from '../SearchCategory';
import styles from './styles.module.css';

interface SearchDropdownProps {
  query: string;
  searchResults: SearchCategoryType[];
  popularQueries: PopularQuery[];
  popularBrands: SearchResult[];
  isError: boolean;
  isVisible: boolean;
  isSearching: boolean;
  onItemClick: (item: SearchResult) => void;
  onQueryClick: (query: string) => void;
}

export const SearchDropdown = ({
  query,
  searchResults,
  popularQueries,
  popularBrands,
  isError,
  isVisible,
  isSearching,
  onItemClick,
  onQueryClick,
}: SearchDropdownProps) => {
  const showPopular = !query.trim();
  const hasResults = searchResults.length > 0;
  const hasPopular = popularQueries.length > 0 || popularBrands.length > 0;

  if (!isVisible) {
    return null;
  }

  const getContent = () => {
    if (isError) {
      return <div className={styles.error}>Произошла ошибка</div>;
    }

    if (showPopular) {
      return (
        <>
          {popularQueries.length > 0 && (
            <SearchCategory
              title="Запросы"
              items={popularQueries.map(query => ({
                id: query.id,
                type: 'query',
                title: query.text,
              }))}
              onItemClick={(item) => onQueryClick(item.title)}
            />
          )}

          {popularBrands.length > 0 && (
            <SearchCategory
              title="Бренды"
              items={popularBrands}
              onItemClick={onItemClick}
            />
          )}

          {!hasPopular && (
            <div className={styles.empty}>Популярные запросы не найдены</div>
          )}
        </>
      );
    }

    const displayResults = isSearching && hasResults ? searchResults : searchResults;
    
    return (
      <>
        {hasResults ? (
          displayResults.map((category) => (
            <SearchCategory
              key={category.id}
              title={category.name}
              items={category.results}
              onItemClick={onItemClick}
            />
          ))
        ) : (
          <div className={styles.empty}>Ничего не найдено</div>
        )}
      </>
    );
  };

  return (
    <div className={`${styles.dropdown} ${isVisible ? styles.show : ''}`}>
      <div className={styles.dropdownContent}>
        <div className={styles.scrollContainer}>
          {getContent()}
        </div>
      </div>
    </div>
  );
};