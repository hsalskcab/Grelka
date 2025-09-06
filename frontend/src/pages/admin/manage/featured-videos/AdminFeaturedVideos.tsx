import React, { useState } from 'react';
import { useFeaturedVideosAdmin } from './hooks/useFeaturedVideosAdmin';
import { VideoList } from './components/VideoList/VideoList';
import { VideoForm } from './components/VideoForm/VideoForm';
import styles from './styles.module.css';

const AdminFeaturedVideos: React.FC = () => {
  const { videos, sellers, loading, error, deleteVideo, refetch } = 
    useFeaturedVideosAdmin();
  
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setEditingVideo(null);
    setShowForm(true);
  };

  const handleEdit = (video: any) => {
    setEditingVideo(video);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingVideo(null);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVideo(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены что хотите удалить это видео?')) {
      const result = await deleteVideo(Number(id));
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Управление фичеред видео</h1>
        <button onClick={handleCreate} className={styles.addButton}>
          Добавить видео
        </button>
      </div>

      {showForm ? (
        <VideoForm
          editingVideo={editingVideo}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      ) : (
        <VideoList
          videos={videos}
          sellers={sellers} // ← ДОБАВЛЯЕМ ПРОПС sellers
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminFeaturedVideos;