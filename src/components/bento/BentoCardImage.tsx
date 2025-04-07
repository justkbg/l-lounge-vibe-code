
import React from 'react';
import { cn } from '@/lib/utils';

interface BentoCardImageProps {
  imageUrl: string;
  title: string;
  isHovered: boolean;
  isLoaded: boolean;
  symbolSvg: string;
}

const BentoCardImage: React.FC<BentoCardImageProps> = ({ 
  imageUrl, 
  title, 
  isHovered, 
  isLoaded,
  symbolSvg
}) => {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden cinematic-vignette">
      <img 
        src={imageUrl} 
        alt={title} 
        className={cn(
          "w-full h-full object-cover transition-transform duration-500",
          isHovered ? "scale-110" : "scale-100",
          isLoaded ? "opacity-100" : "opacity-0",
          "lens-flare volumetric-light dynamic-lighting"
        )}
        loading="lazy"
        style={{ transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      
      {/* Cinematic lighting overlay */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isHovered ? "opacity-70" : "opacity-0"
        )}
        style={{
          background: "radial-gradient(circle at center, rgba(255,215,0,0.15) 0%, transparent 70%)",
          mixBlendMode: "overlay"
        }}
      ></div>
      
      {/* Adinkra Symbol Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(symbolSvg)}")`,
          backgroundSize: '80px',
          backgroundRepeat: 'repeat',
          transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
          transition: 'transform 0.5s ease',
          mixBlendMode: 'overlay',
          opacity: 0.15
        }}
      ></div>
    </div>
  );
};

export default BentoCardImage;
