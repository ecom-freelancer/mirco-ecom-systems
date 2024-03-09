import React from 'react';
import { IconType } from 'react-icons';

export interface MenuItemIconProps {
  icon: IconType;
}

export const MenuIcon: React.FC<MenuItemIconProps> = ({ ...props }) => {
  return <props.icon size={24} {...props} />;
};
