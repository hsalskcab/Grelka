

import { realApi } from '../base-api';
import { Seller, CreateSellerRequest, UpdateSellerRequest } from '../types';

export const sellersApi = {
  // 📃 Получить всех продавцов
  getSellers: async (): Promise<Seller[]> => {
    // 🎯 ЗАМЕНИТЬ: '/api/sellers' на ваш endpoint
    const response = await realApi.get<Seller[]>('/api/sellers');
    return response.data;
  },

  // 📄 Получить продавца по ID
  getSellerById: async (id: number): Promise<Seller> => {
    // 🎯 ЗАМЕНИТЬ: '/api/sellers/{id}' на ваш endpoint
    const response = await realApi.get<Seller>(`/api/sellers/${id}`);
    return response.data;
  },

  // ➕ Создать нового продавца
  createSeller: async (sellerData: CreateSellerRequest): Promise<Seller> => {
    // 🎯 ЗАМЕНИТЬ: '/api/sellers' на ваш endpoint
    const response = await realApi.post<Seller>('/api/sellers', sellerData);
    return response.data;
  },

  // ✏️ Обновить продавца
  updateSeller: async (sellerData: UpdateSellerRequest): Promise<Seller> => {
    // 🎯 ЗАМЕНИТЬ: '/api/sellers/{id}' на ваш endpoint
    const response = await realApi.put<Seller>(`/api/sellers/${sellerData.id}`, sellerData);
    return response.data;
  },

  // 🗑️ Удалить продавца
  deleteSeller: async (id: number): Promise<void> => {
    // 🎯 ЗАМЕНИТЬ: '/api/sellers/{id}' на ваш endpoint
    await realApi.delete(`/api/sellers/${id}`);
  }
};