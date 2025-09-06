

import { realApi } from '../base-api';
import { Slide, CreateSlideRequest, UpdateSlideRequest } from '../types';

export const slidesApi = {
  // 📃 Получить все слайды
  getSlides: async (): Promise<Slide[]> => {
    // 🎯 ЗАМЕНИТЬ: '/api/slides' на ваш endpoint
    const response = await realApi.get<Slide[]>('/api/slides');
    return response.data;
  },

  // 📄 Получить слайд по ID
  getSlideById: async (id: number): Promise<Slide> => {
    // 🎯 ЗАМЕНИТЬ: '/api/slides/{id}' на ваш endpoint
    const response = await realApi.get<Slide>(`/api/slides/${id}`);
    return response.data;
  },

  // ➕ Создать новый слайд
  createSlide: async (slideData: CreateSlideRequest): Promise<Slide> => {
    // 🎯 ЗАМЕНИТЬ: '/api/slides' на ваш endpoint
    const response = await realApi.post<Slide>('/api/slides', slideData);
    return response.data;
  },

  // ✏️ Обновить слайд
  updateSlide: async (slideData: UpdateSlideRequest): Promise<Slide> => {
    // 🎯 ЗАМЕНИТЬ: '/api/slides/{id}' на ваш endpoint
    const response = await realApi.put<Slide>(`/api/slides/${slideData.id}`, slideData);
    return response.data;
  },

  // 🗑️ Удалить слайд
  deleteSlide: async (id: number): Promise<void> => {
    // 🎯 ЗАМЕНИТЬ: '/api/slides/{id}' на ваш endpoint
    await realApi.delete(`/api/slides/${id}`);
  }
};