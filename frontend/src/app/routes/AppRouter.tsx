import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import { 
  HomePage, 
  SellersPage, 
  FiltrationCatalogPage, 
  ChatPage, 
  FavouritePage, 
  ProfilePage 
} from '@/pages';
import { AdminRouter } from './AdminRouter';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Основные маршруты */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SELLERS} element={<SellersPage />} />
      <Route path={ROUTES.CATALOG} element={<FiltrationCatalogPage />} />
      <Route path={ROUTES.CHAT} element={<ChatPage />} />
      <Route path={ROUTES.FAVOURITE} element={<FavouritePage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      
      {/* Админские маршруты - УБРАТЬ отдельный маршрут для ADMIN */}
      <Route path="/admin/*" element={<AdminRouter />} />
      
      {/* 404 страница */}
      <Route path={ROUTES.NOT_FOUND} element={<div>404 - Страница не найдена</div>} />
    </Routes>
  );
};