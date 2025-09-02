// widgets/navbar/components/NavItem.tsx
import { Link } from 'react-router-dom';
import { NavItem as NavItemType } from '../lib/types';
import { HomeIcon, SellersIcon, ProfileIcon, FavouriteIcon, ChatIcon, SettingsIcon} from '@/shared/ui/icons';

interface NavItemProps {
  item: NavItemType;
}

const iconComponents = {
  HomeIcon,
  SellersIcon,
  ProfileIcon,
  FavouriteIcon,
  ChatIcon,
  SettingsIcon,
};

export const NavItem = ({ item }: NavItemProps) => {
  const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];

  return (
    <Link
      to={item.path}
      className="nav-item"
      title={item.label}
    >
      <IconComponent 
        className="nav-item__icon"
        /* Убираем fillColor - иконки будут в родном цвете */
      />
    </Link>
  );
};