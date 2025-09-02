// searchService.ts - исправленная версия для мгновенной отдачи данных
import { SearchCategory, PopularQuery, SearchResult } from '../types/search';
import { mockPopularQueries, mockPopularBrands, mockSearchResults } from '../data/mockSearchData';

class SearchService {
  // Получить популярные запросы и бренды (без задержки)
  async getPopularItems(): Promise<{
    queries: PopularQuery[];
    brands: SearchResult[];
  }> {
    // Убираем setTimeout для мгновенного возврата данных
    return {
      queries: mockPopularQueries,
      brands: mockPopularBrands,
    };
  }

  // Поиск по запросу (минимальная задержка)
  async search(query: string): Promise<SearchCategory[]> {
    return new Promise((resolve) => {
      // Минимальная задержка для имитации сети
      setTimeout(() => {
        if (!query.trim()) {
          resolve([]);
          return;
        }

        const results: SearchCategory[] = [];

        // Фильтруем товары
        const products = mockSearchResults.products.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        if (products.length > 0) {
          results.push({
            id: 'products',
            name: 'Товары',
            results: products,
          });
        }

        // Фильтруем бренды
        const brands = mockSearchResults.brands.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        if (brands.length > 0) {
          results.push({
            id: 'brands',
            name: 'Бренды', 
            results: brands,
          });
        }

        resolve(results);
      }, 50); // Уменьшаем задержку до 50ms
    });
  }
}

export const searchService = new SearchService();