export interface SearchResult {
  id: string;
  type: 'product' | 'brand' | 'query';
  title: string;
  image?: string;
  description?: string;
  popularity?: number;
}

export interface PopularQuery {
  id: string;
  text: string;
  count: number;
}

export interface SearchCategory {
  id: string;
  name: string;
  results: SearchResult[];
}

// Добавляем интерфейс для mock данных
export interface MockSearchData {
  products: SearchResult[];
  brands: SearchResult[];
}