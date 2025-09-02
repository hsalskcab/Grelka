import { PopularQuery, SearchResult, MockSearchData } from '../types/search';

export const mockPopularQueries: PopularQuery[] = [
  { id: '1', text: 'Nike Tn grey', count: 154 },
  { id: '2', text: 'Nike Air force 1', count: 142 },
  { id: '3', text: 'Asics Japan', count: 128 },
  { id: '4', text: 'Jordan 3', count: 115 },
  { id: '5', text: 'Puma RX', count: 98 },
  { id: '6', text: 'Adidas Gazelle', count: 87 },
];

export const mockPopularBrands: SearchResult[] = [
  { id: 'b1', type: 'brand', title: 'Nike', popularity: 245 },
  { id: 'b2', type: 'brand', title: 'Adidas', popularity: 198 },
  { id: 'b3', type: 'brand', title: 'Puma', popularity: 167 },
  { id: 'b4', type: 'brand', title: 'Asics', popularity: 145 },
  { id: 'b5', type: 'brand', title: 'New Balance', popularity: 132 },
  { id: 'b6', type: 'brand', title: 'Reebok', popularity: 98 },
];

export const mockSearchResults: MockSearchData = {
  products: [
    { 
      id: 'p1', 
      type: 'product', 
      title: 'Nike Air Force 1 White', 
      description: 'Кроссовки белые' 
    },
    { 
      id: 'p2', 
      type: 'product', 
      title: 'Adidas Gazelle Black', 
      description: 'Кроссовки черные' 
    },
  ],
  brands: [
    { 
      id: 'b1', 
      type: 'brand', 
      title: 'Nike Sportswear', 
      description: 'Спортивная одежда' 
    },
    { 
      id: 'b2', 
      type: 'brand', 
      title: 'Adidas Originals', 
      description: 'Классические модели' 
    },
  ]
};