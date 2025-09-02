// Navbar.tsx - с управлением мобильным дропдауном
// widgets/navbar/index.tsx
import { useState } from 'react';
import { MAIN_NAV_ITEMS, BOTTOM_NAV_ITEMS, MOBILE_NAV_ITEMS } from './lib/constants';
import { NavItem } from './components/NavItem';
import { MobileNavItem } from './components/MobileNavItem';
import { MobileDropdown } from '@/widgets/header/components/MobileDropdown';
import styles from './styles.module.css';

export const Navbar = () => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSearchResults, setMobileSearchResults] = useState<any[]>([]);

  const handleSearchIconClick = () => {
    setIsMobileDropdownOpen(true);
  };

  const handleMobileSearchChange = (value: string) => {
    setMobileSearchQuery(value);
    // Здесь можно добавить логику поиска для мобильной версии
  };

  const handleMobileSearchClear = () => {
    setMobileSearchQuery('');
    setMobileSearchResults([]);
  };

  const handleMobileSearchSubmit = (value: string) => {
    console.log('Mobile search submitted:', value);
    // Логика поиска для мобильной версии
  };

  const handleMobileDropdownClose = () => {
    setIsMobileDropdownOpen(false);
    setMobileSearchQuery('');
    setMobileSearchResults([]);
  };

  return (
    <>
      {/* Десктопная версия */}
      <nav className={styles.navbar}>
        <div className={styles.navbar__main}>
          {MAIN_NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.navbar__bottom}>
          {BOTTOM_NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      </nav>

      {/* Мобильная версия */}
      <nav className={styles.mobileNavbar}>
        <div className={styles.mobileNavbar__items}>
          {MOBILE_NAV_ITEMS.map((item) => (
            <MobileNavItem
              key={item.id}
              item={item}
              onSearchClick={item.id === 'search' ? handleSearchIconClick : undefined}
            />
          ))}
        </div>
      </nav>

      {/* Мобильный дропдаун поиска */}
      {isMobileDropdownOpen && (
        <MobileDropdown
          searchQuery={mobileSearchQuery}
          searchResults={mobileSearchResults}
          onSearchChange={handleMobileSearchChange}
          onSearchClear={handleMobileSearchClear}
          onSearchSubmit={handleMobileSearchSubmit}
          onClose={handleMobileDropdownClose}
        />
      )}
    </>
  );
};