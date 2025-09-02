import React from 'react';
import { useCategoryDropdown } from './hooks';
import { mockCategories } from './lib/data';
import { GenderButton, MegaMenu } from './components';
import styles from './styles.module.css';

export const CategoryNavigation: React.FC = () => {
  const { activeGender, isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useCategoryDropdown();

  return (
    <div className={styles.container} ref={dropdownRef}> {/* Добавляем ref */}
      <div className={styles.buttonsWrapper}>
        <GenderButton
          isActive={activeGender === 'male'}
          onClick={() => toggleDropdown('male')}
        >
          Мужское
        </GenderButton>
        <GenderButton
          isActive={activeGender === 'female'}
          onClick={() => toggleDropdown('female')}
        >
          Женское
        </GenderButton>
      </div>

      {isDropdownOpen && activeGender && (
        <div className={styles.dropdown}>
          <MegaMenu
            groups={mockCategories[activeGender]}
            gender={activeGender}
            onLinkClick={closeDropdown}
          />
        </div>
      )}
    </div>
  );
};