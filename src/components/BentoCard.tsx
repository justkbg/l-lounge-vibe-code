
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';
import { useFallbackImage } from '@/hooks/useFallbackImage';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Preload the image with more robust error handling
  useEffect(() => {
    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${image}, using fallback`);
      // Fallback is handled by the useFallbackImage hook
      setIsLoaded(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image]);

  // Handle mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    
    // Set the CSS variables for the spotlight effect
    const element = e.currentTarget as HTMLElement;
    element.style.setProperty('--x', `${x}%`);
    element.style.setProperty('--y', `${y}%`);
    
    // Calculate tilt values
    const tiltX = (y - 50) / 10;
    const tiltY = (50 - x) / 10;
    
    element.style.setProperty('--tilt-x', `${tiltX}deg`);
    element.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  return (
    <Link 
      to={link} 
      className={cn(
        'bento-card group block glass-card marcello-card relative overflow-hidden',
        'transform-gpu transition-all duration-300',
        'animate-fade-in opacity-0 perspective-1000',
        'spotlight-effect rim-light tilt-on-hover depth-shadow parallax-card',
        size === 'sm' && 'row-span-1 col-span-1',
        size === 'md' && 'row-span-1 col-span-1 md:col-span-1',
        size === 'lg' && 'row-span-1 col-span-1 md:col-span-2 md:row-span-2',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        ...style,
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-card animate-pulse rounded-2xl overflow-hidden" />
      )}

      {/* Image background */}
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
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        {/* Adinkra pattern overlay */}
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
        
        {/* Marcello X corner accent */}
        <div className="absolute top-4 right-4 w-6 h-6 marcello-x opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-2 marcello-underline inline-block">{title}</h3>
        <p className="text-sm md:text-base text-white mb-4 max-w-xs">{description}</p>
        <span className="text-primary text-sm font-medium inline-flex items-center gap-1 transition-transform group-hover:translate-x-2 py-1 px-2 rounded">
          Explore more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
      </div>
      
      {/* Dynamic lighting effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,215,0,0.15) 0%, transparent 60%)`,
            mixBlendMode: 'overlay'
          }}
        ></div>
      )}
    </Link>
  );
};

export default BentoCard;
