// MobileNavItem.tsx - добавляем стили для кнопки
import { Link } from 'react-router-dom';
import { MobileNavItem as MobileNavItemType } from '../lib/types';
import { HomeIcon, SearchIcon, FavouriteIcon, ChatIcon, ProfileIcon } from '@/shared/ui/icons';
import styles from './styles.module.css'; // Добавляем импорт стилей

interface MobileNavItemProps {
  item: MobileNavItemType;
  onSearchClick?: () => void;
}

const iconComponents = {
  HomeIcon,
  SearchIcon,
  FavouriteIcon,
  ChatIcon,
  ProfileIcon,
};

export const MobileNavItem = ({ item, onSearchClick }: MobileNavItemProps) => {
  const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];

  if (item.id === 'search') {
    return (
      <button
        onClick={onSearchClick}
        className={styles.mobileNavButton} // Используем стили
        title={item.label}
        type="button"
      >
        <IconComponent className={styles.navItemIcon} />
      </button>
    );
  }

  return (
    <Link
      to={item.path}
      className={styles.mobileNavLink}
      title={item.label}
    >
      <IconComponent className={styles.navItemIcon} />
    </Link>
  );
};