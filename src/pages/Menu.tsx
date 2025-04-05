
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import { toast } from '@/components/ui/use-toast';
import MenuTabs from '@/components/menu/MenuTabs';
import menuData from '@/data/menuData';

const Menu = () => {
  const [activeTab, setActiveTab] = useState("drinks");
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // Inform user when all assets are loaded
    const timer = setTimeout(() => {
      setAssetsLoaded(true);
      toast({
        title: "Ready to explore our menu",
        description: "All images and assets have been loaded.",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 relative">
        {/* Add Adinkra background with higher opacity */}
        <AdinkraBackground 
          symbol="random" 
          density={0.4} 
          opacity={0.08} 
          animated={true} 
        />
        
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="section-title animate-fade-in">Our Menu</h1>
            <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A fusion of traditional Ghanaian flavors with international culinary techniques
            </p>
          </div>

          <MenuTabs 
            menuData={menuData} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Menu;
