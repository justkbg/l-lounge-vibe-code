
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

  // Preload all menu images to avoid broken images
  useEffect(() => {
    const allMenuItems = [
      ...menuData.drinks,
      ...menuData.starters,
      ...menuData.mains,
      ...menuData.desserts
    ];
    
    const totalImages = allMenuItems.length;
    let loadedImages = 0;
    
    // Preload function for a single image
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          setAssetsLoaded(true);
          toast({
            title: "Ready to explore our menu",
            description: "All images and assets have been loaded.",
          });
        }
      };
      
      img.onerror = () => {
        console.log(`Failed to load image: ${src}, using fallback`);
        loadedImages++;
        if (loadedImages === totalImages) {
          setAssetsLoaded(true);
          toast({
            title: "Ready to explore our menu",
            description: "Menu is ready to view.",
          });
        }
      };
    };
    
    // Preload all menu item images
    allMenuItems.forEach(item => preloadImage(item.image));
    
    // Fallback if images take too long
    const timer = setTimeout(() => {
      if (!assetsLoaded) {
        setAssetsLoaded(true);
        toast({
          title: "Menu is ready",
          description: "You can explore our menu now.",
        });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced page entrance animation classes
  const pageEnterClasses = "animate-fade-in transition-all duration-700";

  return (
    <>
      <Navbar />
      <main className={`pt-24 pb-20 relative ${pageEnterClasses}`}>
        {/* Add Adinkra background with higher opacity */}
        <AdinkraBackground 
          symbol="random" 
          density={0.4} 
          opacity={0.15} 
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
