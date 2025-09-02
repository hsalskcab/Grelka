import { MOBILE_NAV_ITEMS } from "./constants";

// widgets/navbar/lib/types.ts
export interface NavItem {
  id: string;
  path: string;
  icon: string;
  label: string;
}

export interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: (path: string) => void;
}

// Добавляем тип для мобильных иконок
export type MobileNavItem = typeof MOBILE_NAV_ITEMS[number];