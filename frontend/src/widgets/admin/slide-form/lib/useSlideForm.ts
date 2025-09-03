import { useState } from 'react';
import { Slide, CreateSlideDto, UpdateSlideDto } from '@/shared/api/mockapi/slides/types';
import { slidesApi } from '@/shared/api/mockapi/slides';

interface UseSlideFormProps {
  slide?: Slide;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Функция конвертации файла в Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

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
      let imageUrl = slide?.image || '';
      
      // Конвертируем изображение в Base64 если есть новый файл
      if (imageFile) {
        try {
          imageUrl = await convertToBase64(imageFile);
          console.log('Изображение конвертировано в Base64');
        } catch (convertError) {
          console.error('Ошибка конвертации изображения:', convertError);
          setError('Ошибка обработки изображения');
          return;
        }
      }

      const slideData: CreateSlideDto | UpdateSlideDto = {
        ...formData,
        image: imageUrl // Сохраняем как Base64 строку
      };

      console.log('Отправляемые данные:', {
        ...slideData,
        image: imageUrl ? 'Base64 data (скрыто)' : 'Пусто'
      });

      if (slide) {
        // Редактирование существующего слайда
        await slidesApi.update(slide.id, slideData);
      } else {
        // Создание нового слайда
        await slidesApi.create(slideData as CreateSlideDto);
      }

      onSuccess?.();
    } catch (err: any) {
      console.error('Ошибка при сохранении слайда:', err);
      console.error('Детали ошибки:', err.response?.data);
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