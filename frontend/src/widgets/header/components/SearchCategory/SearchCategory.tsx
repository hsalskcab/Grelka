import { SearchResult } from '../../lib/types/search';
import styles from './styles.module.css';

interface SearchCategoryProps {
  title: string;
  items: SearchResult[];
  onItemClick: (item: SearchResult) => void;
}

export const SearchCategory = ({ title, items, onItemClick }: SearchCategoryProps) => {
  if (items.length === 0) return null;

  return (
    <div className={styles.category}>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <div className={styles.itemsList}>
        {items.map((item) => (
          <span
            key={item.id}
            className={styles.itemLink}
            onClick={() => onItemClick(item)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onItemClick(item);
              }
            }}
          >
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};