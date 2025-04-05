
import React from 'react';
import MenuItemComponent, { MenuItem } from './MenuItem';

interface MenuSectionProps {
  items: MenuItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuSection;
