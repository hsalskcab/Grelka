
import React, { useEffect} from 'react'; // ← Добавить useState
import { useVideoForm } from '../../hooks/useVideoForm';
import { useFeaturedVideosAdmin } from '../../hooks/useFeaturedVideosAdmin';
import styles from './styles.module.css';


interface VideoFormData {
  id?: number;
  title?: string;
  description?: string;
  sellerId?: number;
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: number;
  views?: number;
}

interface VideoFormProps {
  editingVideo?: VideoFormData; // ← Использовать интерфейс здесь
  onCancel: () => void;
  onSuccess: () => void;
}

export const VideoForm: React.FC<VideoFormProps> = ({
  editingVideo,
  onCancel,
  onSuccess
}) => {
  const { sellers, createVideo, updateVideo } = useFeaturedVideosAdmin();
  const {
    formData,
    uploadProgress,
    uploading,
    handleInputChange,
    uploadThumbnail,
    uploadVideo,
    setFormData
  } = useVideoForm();

  useEffect(() => {
    if (editingVideo) {
      setFormData(editingVideo);
    }
  }, [editingVideo, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingVideo) {
        await updateVideo(editingVideo.id!, formData); // ← добавить !
      } else {
        await createVideo(formData);
      }
      onSuccess();
    } catch (error: any) {
      console.error('Ошибка сохранения видео:', error);
      alert(error.response?.data?.message || 'Ошибка сохранения видео');
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    const result = await uploadThumbnail(file);
    if (result.success) {
      handleInputChange('thumbnailUrl', result.url);
    }
  };

  const handleVideoUpload = async (file: File) => {
    const result = await uploadVideo(file);
    if (result.success) {
      handleInputChange('videoUrl', result.url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Заголовок</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Описание</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Продавец</label>
        <select
          value={formData.sellerId || ''}
          onChange={(e) => handleInputChange('sellerId', parseInt(e.target.value))}
          required
        >
          <option value="">Выберите продавца</option>
          {sellers.map(seller => (
            <option key={seller.id} value={seller.id}>
              {seller.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Превью (thumbnail)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleThumbnailUpload(file);
          }}
          disabled={uploading}
        />
        {uploading && <div>Загрузка: {uploadProgress}%</div>}
        {formData.thumbnailUrl && (
          <img src={formData.thumbnailUrl} alt="Preview" className={styles.thumbnailPreview} />
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Видео файл</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleVideoUpload(file);
          }}
          disabled={uploading}
        />
        {formData.videoUrl && (
          <video src={formData.videoUrl} controls className={styles.videoPreview} />
        )}
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" disabled={uploading}>
          {editingVideo ? 'Обновить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};