
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Define the MenuItem interface that can be used in other components
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
}

// Fallback images for when primary images fail to load
const fallbackImages = [
  "https://images.unsplash.com/photo-1547595468-fdb5de8a07d6?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486947799489-3fabdd7d32a6?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
];

interface MenuItemProps {
  item: MenuItem;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get a deterministic fallback image based on the item name
  const getFallbackImage = () => {
    const index = item.name.length % fallbackImages.length;
    return fallbackImages[index];
  };
  
  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = item.image;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${item.image}, using fallback`);
      setImageError(true);
      
      // Try with fallback
      const fallbackImg = new Image();
      fallbackImg.src = getFallbackImage();
      
      fallbackImg.onload = () => {
        setIsLoaded(true);
      };
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [item.image]);

  return (
    <Card className="overflow-hidden border-border hover:border-primary transition-colors duration-300 group">
      <div className="relative h-48 overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-card animate-pulse rounded-t-lg" />
        )}
        <img 
          src={imageError ? getFallbackImage() : item.image} 
          alt={item.name} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
            {item.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-xs font-medium bg-lounge-gold/80 text-black px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-playfair font-bold text-primary">{item.name}</h3>
          <span className="font-medium text-primary">{item.price}</span>
        </div>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default MenuItemComponent;
