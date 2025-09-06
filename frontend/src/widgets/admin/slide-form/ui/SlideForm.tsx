import React from 'react';
import { ImageUploader } from '@/widgets/admin/image-uploader';
import { useSlideForm } from '../lib/useSlideForm';
import { Slide } from '@/shared/api/real';
import styles from './styles.module.css';

interface SlideFormProps {
  slide?: Slide;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const SlideForm: React.FC<SlideFormProps> = ({ slide, onSuccess, onCancel }) => {
  const {
    formData,
    isUploading: isLoading,
    error,
    updateField: handleInputChange,
  } = useSlideForm(slide ? {
    title: slide.title,
    description: slide.description,
    link: slide.link,
    imageUrl: slide.imageUrl,
    isActive: slide.isActive,
    order: slide.order
  } : undefined);

  // Правильная функция для ImageUploader - принимает URL строку
  const handleImageUpload = (url: string) => {
    handleInputChange('imageUrl', url);
  };

  // Создаем handleSubmit так как его нет в хуке
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь должна быть логика сохранения слайда
    console.log('Submit form data:', formData);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{slide ? 'Редактирование слайда' : 'Создание слайда'}</h2>

      <ImageUploader
        onImageUpload={handleImageUpload} // ← теперь передаем правильную функцию
        currentImage={formData.imageUrl} // ← используем imageUrl из formData
        label="Изображение слайда"
      />

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Заголовок
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="link" className={styles.label}>
          Ссылка
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link || ''}
          onChange={(e) => handleInputChange('link', e.target.value)}
          className={styles.input}
          placeholder="https://example.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="order" className={styles.label}>
          Порядок
        </label>
        <input
          type="number"
          id="order"
          name="order"
          value={formData.order || 0}
          onChange={(e) => handleInputChange('order', Number(e.target.value))}
          className={styles.input}
          min="0"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive || false}
            onChange={(e) => handleInputChange('isActive', e.target.checked)}
            className={styles.checkbox}
          />
          Активный
        </label>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={isLoading}
        >
          Отмена
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : (slide ? 'Сохранить' : 'Создать')}
        </button>
      </div>
    </form>
  );
};