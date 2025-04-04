
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

interface BentoCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  adinkraSymbol?: keyof typeof adinkraSymbols | 'random';
}

const BentoCard = ({ 
  title, 
  description, 
  image, 
  link, 
  className,
  size = 'md',
  style,
  adinkraSymbol = 'nyameNti'
}: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // More reliable fallback images with absolute URLs
  const fallbackImages = [
    "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=1736&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544637378-a0ddf15e73c0?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1758&auto=format&fit=crop"
  ];

  // Get a deterministic fallback image based on the title length
  const getFallbackImage = () => {
    const index = title.length % fallbackImages.length;
    return fallbackImages[index];
  };

  // Preload the image with more robust error handling
  useEffect(() => {
    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      setIsLoaded(true);
      setImageError(false);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${image}, using fallback`);
      setImageError(true);
      
      // Try with fallback
      const fallbackImg = new Image();
      const fallbackSrc = getFallbackImage();
      fallbackImg.src = fallbackSrc;
      
      fallbackImg.onload = () => {
        setIsLoaded(true);
      };
      
      fallbackImg.onerror = () => {
        console.error("Even fallback image failed to load:", fallbackSrc);
      };
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

  // Get the actual symbol to use - handle 'random' case
  const getSymbolKey = (): keyof typeof adinkraSymbols => {
    if (adinkraSymbol === 'random') {
      const symbolKeys = Object.keys(adinkraSymbols) as Array<keyof typeof adinkraSymbols>;
      return symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
    }
    return adinkraSymbol;
  };

  const symbolKey = getSymbolKey();
  const symbolSvg = adinkraSymbols[symbolKey];

  return (
    <Link 
      to={link} 
      className={cn(
        'bento-card group block glass-card hover-float cursor-glow relative overflow-hidden',
        'transform-gpu transition-all duration-300',
        'animate-fade-in opacity-0',
        size === 'sm' && 'row-span-1 col-span-1',
        size === 'md' && 'row-span-1 col-span-1 md:col-span-1',
        size === 'lg' && 'row-span-1 col-span-1 md:col-span-2 md:row-span-2',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        ...style,
        transform: isHovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0) scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-card animate-pulse rounded-2xl overflow-hidden" />
      )}

      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <img 
          src={imageError ? getFallbackImage() : image} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onError={() => setImageError(true)}
          style={{ transition: 'transform 0.5s ease, opacity 0.5s ease' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        {/* Adinkra Symbol Overlay */}
        <div className="absolute inset-0 opacity-5 adinkra-pattern"></div>

        {/* Ghanaian pattern background - Directly embed SVG for better reliability */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(symbolSvg)}")`,
            backgroundSize: '80px',
            backgroundRepeat: 'repeat',
            transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.5s ease',
            mixBlendMode: 'overlay'
          }}
        ></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-2 kente-border">{title}</h3>
        <p className="text-sm md:text-base text-white mb-4 max-w-xs">{description}</p>
        <span className="text-primary text-sm font-medium inline-flex items-center gap-1 transition-transform group-hover:translate-x-2 neo-glow py-1 px-2 rounded">
          Explore more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
        
        {/* Animated elements on hover */}
        {isHovered && (
          <>
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FBC02D] opacity-70 animate-pulse" />
            {/* Directly render the SVG for the symbol instead of using dangerouslySetInnerHTML */}
            <div 
              className="absolute bottom-4 left-4 w-8 h-8 opacity-80"
              dangerouslySetInnerHTML={{ __html: symbolSvg }}
              style={{ 
                animation: 'spin 4s linear infinite',
                color: '#FFD700'
              }}
            />
          </>
        )}
      </div>
    </Link>
  );
};

export default BentoCard;
