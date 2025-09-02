import { CategoryGroup, Gender } from '../types/category';

export const mockCategories: Record<Gender, CategoryGroup[]> = {
  male: [
    {
      id: 'm-top',
      title: 'Верх',
      slug: 'top',
      items: [
        { id: 'm-t1', name: 'Футболки', slug: 't-shirts' },
        { id: 'm-t2', name: 'Лонгсливы', slug: 'longsleeves' },
        { id: 'm-t3', name: 'Худи', slug: 'hoodies' },
        { id: 'm-t4', name: 'Свитшоты', slug: 'sweatshirts' },
        { id: 'm-t5', name: 'Рубашки', slug: 'shirts' },
      ],
    },
    {
      id: 'm-bottom',
      title: 'Низ',
      slug: 'bottom',
      items: [
        { id: 'm-b1', name: 'Джинсы', slug: 'jeans' },
        { id: 'm-b2', name: 'Брюки', slug: 'pants' },
        { id: 'm-b3', name: 'Шорты', slug: 'shorts' },
        { id: 'm-b4', name: 'Спортивные штаны', slug: 'joggers' },
      ],
    },
    {
      id: 'm-outerwear',
      title: 'Верхняя одежда',
      slug: 'outerwear',
      items: [
        { id: 'm-o1', name: 'Пальто', slug: 'coats' },
        { id: 'm-o2', name: 'Куртки', slug: 'jackets' },
        { id: 'm-o3', name: 'Пуховики', slug: 'puffer-jackets' },
        { id: 'm-o4', name: 'Плащи', slug: 'trench-coats' },
      ],
    },
    {
      id: 'm-shoes',
      title: 'Обувь',
      slug: 'shoes',
      items: [
        { id: 'm-s1', name: 'Кроссовки', slug: 'sneakers' },
        { id: 'm-s2', name: 'Ботинки', slug: 'boots' },
        { id: 'm-s3', name: 'Туфли', slug: 'loafers' },
        { id: 'm-s4', name: 'Сандалии', slug: 'sandals' },
      ],
    },
    {
      id: 'm-accessories',
      title: 'Аксессуары',
      slug: 'accessories',
      items: [
        { id: 'm-a1', name: 'Шапки', slug: 'hats' },
        { id: 'm-a2', name: 'Ремни', slug: 'belts' },
        { id: 'm-a3', name: 'Сумки', slug: 'bags' },
        { id: 'm-a4', name: 'Носки', slug: 'socks' },
      ],
    },
  ],
  female: [
    {
      id: 'f-top',
      title: 'Верх',
      slug: 'top',
      items: [
        { id: 'f-t1', name: 'Футболки', slug: 't-shirts' },
        { id: 'f-t2', name: 'Топы', slug: 'tops' },
        { id: 'f-t3', name: 'Блузки', slug: 'blouses' },
        { id: 'f-t4', name: 'Свитшоты', slug: 'sweatshirts' },
      ],
    },
    {
      id: 'f-bottom',
      title: 'Низ',
      slug: 'bottom',
      items: [
        { id: 'f-b1', name: 'Джинсы', slug: 'jeans' },
        { id: 'f-b2', name: 'Юбки', slug: 'skirts' },
        { id: 'f-b3', name: 'Платья', slug: 'dresses' },
        { id: 'f-b4', name: 'Леггинсы', slug: 'leggings' },
      ],
    },
    {
      id: 'f-outerwear',
      title: 'Верхняя одежда',
      slug: 'outerwear',
      items: [
        { id: 'f-o1', name: 'Пальто', slug: 'coats' },
        { id: 'f-o2', name: 'Куртки', slug: 'jackets' },
        { id: 'f-o3', name: 'Пуховики', slug: 'puffer-jackets' },
        { id: 'f-o4', name: 'Плащи', slug: 'trench-coats' },
      ],
    },
    {
      id: 'f-shoes',
      title: 'Обувь',
      slug: 'shoes',
      items: [
        { id: 'f-s1', name: 'Кроссовки', slug: 'sneakers' },
        { id: 'f-s2', name: 'Туфли', slug: 'heels' },
        { id: 'f-s3', name: 'Ботильоны', slug: 'ankle-boots' },
        { id: 'f-s4', name: 'Босоножки', slug: 'sandals' },
      ],
    },
    {
      id: 'f-accessories',
      title: 'Аксессуары',
      slug: 'accessories',
      items: [
        { id: 'f-a1', name: 'Сумки', slug: 'bags' },
        { id: 'f-a2', name: 'Шарфы', slug: 'scarves' },
        { id: 'f-a3', name: 'Бижутерия', slug: 'jewelry' },
        { id: 'f-a4', name: 'Головные уборы', slug: 'hats' },
      ],
    },
  ],
};