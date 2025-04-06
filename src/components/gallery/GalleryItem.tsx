
import React, { useState } from 'react';
import { GalleryImage, getFallbackImageUrl } from './GalleryGrid';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, index, onClick }) => {
  const [itemImageError, setItemImageError] = useState(false);
  
  return (
    <div 
      className="gallery-item aspect-square rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 reveal-on-scroll"
      style={{ animationDelay: `${0.1 * (index % 6)}s` }}
      onClick={onClick}
    >
      <div className="relative h-full perspective-1000">
        <img 
          src={itemImageError ? getFallbackImageUrl(image.title) : image.image} 
          alt={image.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setItemImageError(true)}
          loading="lazy"
        />
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
      </div>
    </div>
  );
};

export default GalleryItem;
