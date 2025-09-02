import React, { useState, useEffect } from 'react';
import { useHeroSlider } from './hooks';
import { Slide } from './components/Slide';
import { SliderControls } from './components/SlideControls';
import { slidesApi } from '@/shared/api/mockapi/slides';
import { ISlide } from './lib/types';
import styles from './styles.module.css';

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSlide, goToNext, goToPrev, resetTimer } = useHeroSlider(slides.length);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      const data = await slidesApi.getAll();
      // Преобразуем данные из API в формат ISlide
      const formattedSlides: ISlide[] = data
        .filter(slide => slide.isActive)
        .sort((a, b) => a.order - b.order)
        .map(slide => ({
          id: slide.id,
          image: slide.image,
          title1: slide.title,
          title2: slide.description,
          url: slide.link
        }));
      
      setSlides(formattedSlides);
    } catch (err) {
      console.error('Error loading slides:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextClick = () => {
    goToNext();
    resetTimer();
  };

  const handlePrevClick = () => {
    goToPrev();
    resetTimer();
  };

  if (isLoading) {
    return <div className={styles.slider}>Загрузка слайдов...</div>;
  }

  if (slides.length === 0) {
    return <div className={styles.slider}>Нет активных слайдов</div>;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContainer}>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
          />
        ))}
      </div>
      
      <SliderControls
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
    </div>
  );
};