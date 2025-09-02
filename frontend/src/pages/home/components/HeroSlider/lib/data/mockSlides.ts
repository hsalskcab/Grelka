import { ISlide } from '../types/slide'; // Добавляем импорт

export const mockSlides: ISlide[] = [
  {
    id: 1,
    image: '/images/slides/slide-1.webp',
    title1: 'Новая коллекция',
    title2: 'Осень-Зима 2024',
    url: '/catalog?collection=new'
  },
  {
    id: 2, 
    image: '/images/slides/slide-2.webp',
    title1: 'Скидки до 50%',
    title2: 'Только эту неделю',
    url: '/sale'
  },
  {
    id: 3,
    image: '/images/slides/slide-3.webp',
    title1: 'Бесплатная доставка',
    title2: 'При заказе от 5000₽',
    url: '/delivery'
  }
];