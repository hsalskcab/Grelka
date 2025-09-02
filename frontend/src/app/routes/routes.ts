export const ROUTES = {
  HOME: '/',
  SELLERS: '/sellers',
  CATALOG: '/catalog',
  CHAT: '/chat',
  FAVOURITE: '/favourite',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_SLIDES: '/admin/slides',
  NOT_FOUND: '*'
} as const;

// Добавить относительные пути для админки
export const ADMIN_ROUTES = {
  DASHBOARD: 'dashboard',
  SLIDES: 'slides'
} as const;