import { axiosInstance } from '../base-api';
import { Slide, CreateSlideDto, UpdateSlideDto } from './types';

const SLIDES_ENDPOINT = '/admin';

export const slidesApi = {
  // Получить все слайды
  getAll: async (): Promise<Slide[]> => {
    console.log('Fetching all slides from MockAPI...');
    try {
      const response = await axiosInstance.get(SLIDES_ENDPOINT);
      console.log('GET all slides response:', response.data);
      return response.data;
    } catch (error) {
      console.error('GET all slides error:', error);
      throw error;
    }
  },

  // Получить один слайд
  getById: async (id: string): Promise<Slide> => {
    console.log('Fetching slide by ID:', id);
    try {
      const response = await axiosInstance.get(`${SLIDES_ENDPOINT}/${id}`);
      console.log('GET slide response:', response.data);
      return response.data;
    } catch (error) {
      console.error('GET slide error:', error);
      throw error;
    }
  },

  // Создать слайд
  create: async (slideData: CreateSlideDto): Promise<Slide> => {
    console.log('Sending to MockAPI (create):', JSON.stringify(slideData, null, 2));
    
    try {
      const response = await axiosInstance.post(SLIDES_ENDPOINT, slideData);
      console.log('MockAPI create response:', response.data);
      console.log('Response status:', response.status);
      return response.data;
    } catch (error: any) {
      console.error('CREATE slide error:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  // Обновить слайд
  update: async (id: string, slideData: UpdateSlideDto): Promise<Slide> => {
    console.log('Updating in MockAPI:', id, JSON.stringify(slideData, null, 2));
    
    try {
      const response = await axiosInstance.put(`${SLIDES_ENDPOINT}/${id}`, slideData);
      console.log('MockAPI update response:', response.data);
      console.log('Response status:', response.status);
      return response.data;
    } catch (error: any) {
      console.error('UPDATE slide error:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  // Удалить слайд
  delete: async (id: string): Promise<void> => {
    console.log('Deleting slide:', id);
    try {
      const response = await axiosInstance.delete(`${SLIDES_ENDPOINT}/${id}`);
      console.log('DELETE response status:', response.status);
    } catch (error) {
      console.error('DELETE slide error:', error);
      throw error;
    }
  },
};