import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';
import { useFallbackImage } from '@/hooks/useFallbackImage';
import AdinkraSymbol from '@/components/AdinkraSymbol';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const { imageUrl, imageError } = useFallbackImage(image, title);
  
  const getSymbolKey = (): keyof typeof adinkraSymbols => {
    if (adinkraSymbol === 'random') {
      const symbolKeys = Object.keys(adinkraSymbols) as Array<keyof typeof adinkraSymbols>;
      return symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
    }
    return adinkraSymbol;
  };

  const symbolKey = getSymbolKey();
  const symbolSvg = adinkraSymbols[symbolKey];

  useEffect(() => {
    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${image}, using fallback`);
      
      setIsLoaded(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

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
      {!isLoaded && (
        <div className="absolute inset-0 bg-card animate-pulse rounded-2xl overflow-hidden" />
      )}

      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          style={{ transition: 'transform 0.5s ease, opacity 0.5s ease' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml;charset=utf8,${encodeURIComponent(symbolSvg)}")`,
            backgroundSize: '60px',
            backgroundRepeat: 'repeat',
            transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.5s ease',
            mixBlendMode: 'overlay',
            opacity: 0.12
          }}
        ></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-2">{title}</h3>
        <p className="text-sm md:text-base text-white mb-4 max-w-xs">{description}</p>
        <span className="text-primary text-sm font-medium inline-flex items-center gap-1 transition-transform group-hover:translate-x-2 neo-glow py-1 px-2 rounded">
          Explore more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
        
        {isHovered && (
          <>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FBC02D] opacity-60 animate-pulse" />
            <div className="absolute bottom-4 left-4 w-6 h-6 opacity-70">
              <AdinkraSymbol symbol={symbolKey} size={24} animate="float" />
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default BentoCard;
