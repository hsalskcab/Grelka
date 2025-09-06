// 📋 ОПИСАНИЕ: Хук для формы слайдов
// 🔧 ИЗМЕНЕНИЯ: Замена Base64 на реальную загрузку изображений

import { useState } from 'react';
import { uploadApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт

interface SlideFormData {
  title?: string;
  description?: string;
  link?: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
}

export const useSlideForm = (initialData?: SlideFormData) => {
  const [formData, setFormData] = useState<SlideFormData>(initialData || {
    title: '',
    description: '',
    link: '',
    imageUrl: '',
    isActive: true,
    order: 0
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const uploadImage = async (file: File): Promise<boolean> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      // 🎯 РЕАЛЬНАЯ ЗАГРУЗКА изображения
      const response = await uploadApi.uploadFile(file, 'image', (progress) => {
        setUploadProgress(progress);
      });

      updateField('imageUrl', response.url);
      setIsUploading(false);
      return true;
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка загрузки изображения');
      setIsUploading(false);
      return false;
    }
  };

  const removeImage = async (): Promise<void> => {
    if (formData.imageUrl) {
      try {
        await uploadApi.deleteFile(formData.imageUrl);
      } catch (err) {
        console.error('Ошибка удаления изображения:', err);
      }
    }
    updateField('imageUrl', '');
    setError(null);
  };

  return {
    formData,
    uploadProgress,
    isUploading,
    error,
    updateField,
    uploadImage,
    removeImage,
    setFormData
  };
};