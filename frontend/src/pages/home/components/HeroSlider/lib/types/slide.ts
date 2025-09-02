export interface ISlide {
  id: string | number;
  image: string;       // URL картинки слайда
  title1: string;      // Заголовок 1 (в левом нижнем углу)
  title2: string;      // Заголовок 2 (под первым)
  url?: string;        // Опциональная ссылка для всего слайда
}