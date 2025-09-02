export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryGroup {
  id: string;
  title: string; // 'Верх', 'Низ', и т.д.
  slug: string;  // Для заголовка-ссылки "Увидеть всё"
  items: Category[]; // Список категорий внутри группы
}

export type Gender = 'male' | 'female';