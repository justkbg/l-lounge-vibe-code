
import React, { useState } from 'react';
import { GalleryImage } from './GalleryGrid';
import OptimizedImage from '@/components/OptimizedImage';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, index, onClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  // Handle mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    
    // Set the CSS variables for the spotlight effect
    const element = e.currentTarget as HTMLElement;
    element.style.setProperty('--x', `${x}%`);
    element.style.setProperty('--y', `${y}%`);
    
    // Calculate tilt values
    const tiltX = (y - 50) / 15;
    const tiltY = (50 - x) / 15;
    
    element.style.setProperty('--tilt-x', `${tiltX}deg`);
    element.style.setProperty('--tilt-y', `${tiltY}deg`);
  };
  
  return (
    <div 
      className="gallery-item aspect-square rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 reveal-on-scroll parallax-card-container spotlight-effect lens-flare cinematic-vignette"
      style={{ animationDelay: `${0.1 * (index % 6)}s` }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className="relative h-full perspective-1000 tilt-on-hover">
        <OptimizedImage 
          src={image.image}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 dynamic-lighting"
          fallbackIdentifier={image.title}
        />
        
        {/* Dramatic lighting overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,215,0,0.15) 0%, transparent 60%)`,
            mixBlendMode: 'overlay'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <h3 className="text-xl font-playfair font-bold text-primary gold-shimmer">{image.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">{image.category}</span>
            <p className="text-white text-sm">Click to view</p>
          </div>
        </div>
        
        {/* Cinematic overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 adinkra-pattern mix-blend-overlay"></div>
        </div>
        
        {/* Side rim light */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-10 opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(255,215,0,0.2), transparent)',
            filter: 'blur(5px)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default GalleryItem;
