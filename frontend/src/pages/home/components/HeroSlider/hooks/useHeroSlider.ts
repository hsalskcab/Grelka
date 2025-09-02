import { useState, useEffect, useCallback, useRef } from 'react';

export const useHeroSlider = (slidesCount: number, autoPlayInterval: number = 7000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<number | null>(null); // Заменяем NodeJS.Timeout на number

  // Функция перехода к следующему слайду (с бесконечной цикличностью)
  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  }, [slidesCount]);

  // Функция перехода к предыдущему слайду (с бесконечной цикличностью)
  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  }, [slidesCount]);

  // Функция перехода к конкретному слайду
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Функция сброса и перезапуска таймера
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPlaying(true);
  }, []);

  // Эффект для автоплея
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = window.setInterval(() => { // Используем window.setInterval
      goToNext();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, goToNext, autoPlayInterval]);

  // Пауза при наведении (опционально, можно добавить позже)
  const pause = useCallback(() => setIsPlaying(false), []);
  const play = useCallback(() => setIsPlaying(true), []);

  return {
    currentSlide,
    isPlaying,
    goToNext,
    goToPrev,
    goToSlide,
    resetTimer,
    pause,
    play,
  };
};