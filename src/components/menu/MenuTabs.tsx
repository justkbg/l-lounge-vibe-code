
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MenuSection from './MenuSection';
import { MenuItem } from './MenuItem';

interface MenuTabsProps {
  menuData: Record<string, MenuItem[]>;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ menuData, activeTab, setActiveTab }) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex justify-center mb-12">
        <TabsList className="glass-effect">
          <TabsTrigger value="drinks">Signature Drinks</TabsTrigger>
          <TabsTrigger value="starters">Starters</TabsTrigger>
          <TabsTrigger value="mains">Main Courses</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="drinks" className="animate-fade-in">
        <MenuSection items={menuData.drinks} />
      </TabsContent>

      <TabsContent value="starters" className="animate-fade-in">
        <MenuSection items={menuData.starters} />
      </TabsContent>

      <TabsContent value="mains" className="animate-fade-in">
        <MenuSection items={menuData.mains} />
      </TabsContent>

      <TabsContent value="desserts" className="animate-fade-in">
        <MenuSection items={menuData.desserts} />
      </TabsContent>
    </Tabs>
  );
};

export default MenuTabs;
