// widgets/navbar/lib/constants.ts
import { ROUTES } from '@/app/routes/routes';

export const MAIN_NAV_ITEMS = [
  {
    id: 'home',
    path: ROUTES.HOME,
    icon: 'HomeIcon',
    label: 'Главная',
  },
  {
    id: 'sellers',
    path: ROUTES.SELLERS,
    icon: 'SellersIcon',
    label: 'Продавцы',
  },
  {
    id: 'profile',
    path: ROUTES.PROFILE,
    icon: 'ProfileIcon',
    label: 'Личный кабинет',
  },
  {
    id: 'favourite',
    path: ROUTES.FAVOURITE,
    icon: 'FavouriteIcon', 
    label: 'Избранное',
  },
  {
    id: 'chat',
    path: ROUTES.CHAT,
    icon: 'ChatIcon',
    label: 'Сообщения',
  },
] as const;

export const BOTTOM_NAV_ITEMS = [
  {
    id: 'settings',
    path: ROUTES.PROFILE,
    icon: 'SettingsIcon',
    label: 'Настройки',
  },
] as const;

// Новая иконка для мобильной версии
export const MOBILE_NAV_ITEMS = [
  {
    id: 'home',
    path: ROUTES.HOME,
    icon: 'HomeIcon',
    label: 'Главная',
  },
  {
    id: 'search',
    path: '#',
    icon: 'SearchIcon',
    label: 'Поиск',
  },
  {
    id: 'favourite',
    path: ROUTES.FAVOURITE,
    icon: 'FavouriteIcon', 
    label: 'Избранное',
  },
  {
    id: 'chat',
    path: ROUTES.CHAT,
    icon: 'ChatIcon',
    label: 'Сообщения',
  },
  {
    id: 'profile',
    path: ROUTES.PROFILE,
    icon: 'ProfileIcon',
    label: 'Профиль',
  },
] as const;