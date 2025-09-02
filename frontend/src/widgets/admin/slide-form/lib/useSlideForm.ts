import { useState } from 'react';
import { Slide, CreateSlideDto, UpdateSlideDto } from '@/shared/api/mockapi/slides/types';
import { slidesApi } from '@/shared/api/mockapi/slides';

interface UseSlideFormProps {
  slide?: Slide;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const useSlideForm = ({ slide, onSuccess, onCancel }: UseSlideFormProps) => {
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    description: slide?.description || '',
    link: slide?.link || '',
    isActive: slide?.isActive ?? true,
    order: slide?.order || 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const slideData: CreateSlideDto | UpdateSlideDto = {
        ...formData,
        image: imageFile ? URL.createObjectURL(imageFile) : slide?.image || '',
      };

      console.log('Отправляемые данные:', JSON.stringify(slideData, null, 2)); // ← Подробный вывод

      if (slide) {
        const response = await slidesApi.update(slide.id, slideData);
        console.log('Update response:', response);
      } else {
        const response = await slidesApi.create(slideData as CreateSlideDto);
        console.log('Create response:', response);
      }

      onSuccess?.();
    } catch (err: any) {
      console.error('Slide save error details:', err);
      console.error('Error response:', err.response?.data); // ← Данные ошибки
      setError('Ошибка при сохранении слайда: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    imageFile,
    isLoading,
    error,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    onCancel
  };
};