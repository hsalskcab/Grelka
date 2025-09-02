import React from 'react';
import { ChevronVertical } from '@/shared/ui/icons'; // Импортируем шеврон
import styles from './styles.module.css';

interface GenderButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const GenderButton: React.FC<GenderButtonProps> = ({
  children,
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
      onClick={onClick}
    >
      {children}
      {/* Добавляем шеврон с анимацией поворота */}
      <ChevronVertical 
        size={10}
        className={`${styles.chevron} ${isActive ? styles.chevronRotated : ''}`}
      />
    </button>
  );
};