import { realApi } from '../base-api';
import { UploadResponse, FileType } from './types';

export const uploadApi = {
  // 📤 Загрузка файла с прогрессом
  uploadFile: async (
    file: File, 
    type: FileType,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    // 🎯 ЗАМЕНИТЬ: '/api/upload' на ваш endpoint
    const response = await realApi.post<UploadResponse>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        onProgress?.(percent);
      }
    });

    return response.data;
  },

  // 🗑️ Удаление файла (если нужно)
  deleteFile: async (fileUrl: string): Promise<void> => {
    // 🎯 ЗАМЕНИТЬ: '/api/upload/delete' на ваш endpoint
    await realApi.delete('/api/upload/delete', {
      data: { fileUrl }
    });
  }
};