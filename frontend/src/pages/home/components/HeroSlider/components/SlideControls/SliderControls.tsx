import React from 'react';
import { ChevronHorizontal } from '@/shared/ui/icons';
import styles from './styles.module.css';

interface SliderControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const SliderControls: React.FC<SliderControlsProps> = ({
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.controlButton}
        onClick={onPrevClick}
        aria-label="Предыдущий слайд"
      >
        <ChevronHorizontal 
          size={24} 
          fillColor="#7F7F7F" // ← Меняем на серый цвет
          direction="right" // → Правая стрелка для левой кнопки
        />
      </button>
      <button
        type="button"
        className={styles.controlButton}
        onClick={onNextClick}
        aria-label="Следующий слайд"
      >
        <ChevronHorizontal 
          size={24} 
          fillColor="#7F7F7F" // ← Меняем на серый цвет
          direction="left" // ← Левая стрелка для правой кнопки
        />
      </button>
    </div>
  );
};