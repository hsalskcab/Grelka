import React from 'react';
import { ISlide } from '../../lib/types';
import styles from './styles.module.css';

interface SlideProps {
  slide: ISlide;
  isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ slide, isActive }) => {
  return (
    <div className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}>
      <img 
        src={slide.image} 
        alt={`Slide ${slide.id}`} 
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title1}>{slide.title1}</h2>
        <h3 className={styles.title2}>{slide.title2}</h3>
      </div>
    </div>
  );
};