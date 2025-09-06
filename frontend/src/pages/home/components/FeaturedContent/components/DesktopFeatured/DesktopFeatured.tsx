import { useState, useEffect } from 'react';
import { Slide } from '@/shared/api/real/types';
import { slidesApi } from '@/shared/api/real';
import { SlideForm } from '@/widgets/admin/slide-form';
import styles from './styles.module.css';

const AdminSlides = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

  const loadSlides = async () => {
    try {
      setIsLoading(true);
      const data = await slidesApi.getSlides();
      setSlides(data);
    } catch (err) {
      setError('Ошибка загрузки слайдов');
      console.error('Load slides error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот слайд?')) {
      try {
        await slidesApi.deleteSlide(id);
        await loadSlides();
      } catch (err) {
        setError('Ошибка удаления слайда');
        console.error('Delete slide error:', err);
      }
    }
  };

  const handleSuccess = () => {
    setIsCreating(false);
    setEditingSlide(null);
    loadSlides();
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isCreating || editingSlide) {
    return (
      <div>
        <button 
          onClick={() => {
            setIsCreating(false);
            setEditingSlide(null);
          }}
          className={styles.backButton}
        >
          ← Назад к списку
        </button>
        <SlideForm
          slide={editingSlide || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setIsCreating(false);
            setEditingSlide(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Управление слайдами</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className={styles.createButton}
        >
          + Добавить слайд
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.slidesGrid}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slideCard}>
            <img 
              src={slide.imageUrl}
              alt={slide.title}
              className={styles.slideImage}
            />
            <div className={styles.slideInfo}>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <div className={styles.slideMeta}>
                <span>Порядок: {slide.order}</span>
                <span className={slide.isActive ? styles.active : styles.inactive}>
                  {slide.isActive ? 'Активен' : 'Неактивен'}
                </span>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => setEditingSlide(slide)}
                  className={styles.editButton}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className={styles.deleteButton}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className={styles.emptyState}>
          <p>Нет добавленных слайдов</p>
        </div>
      )}
    </div>
  );
};

// ВАЖНО: Добавляем экспорт по умолчанию
export default AdminSlides;