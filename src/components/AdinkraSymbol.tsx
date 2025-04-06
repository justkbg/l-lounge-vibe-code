
import React, { useEffect, useState } from 'react';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

interface AdinkraSymbolProps {
  symbol?: keyof typeof adinkraSymbols | 'random';
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean | 'spin' | 'pulse' | 'float';
  opacity?: number;
  withShadow?: boolean;
}

const AdinkraSymbol: React.FC<AdinkraSymbolProps> = ({
  symbol = 'nyameNti',
  size = 30, // Made default size smaller
  color = 'currentColor',
  className = '',
  style = {},
  animate = false,
  opacity = 0.8, // Default opacity a bit higher for better visibility
  withShadow = true
}) => {
  const [currentSymbol, setCurrentSymbol] = useState<keyof typeof adinkraSymbols>('nyameNti');
  
  // Handle random symbol selection
  useEffect(() => {
    if (symbol === 'random') {
      const symbolKeys = Object.keys(adinkraSymbols) as Array<keyof typeof adinkraSymbols>;
      const randomKey = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
      setCurrentSymbol(randomKey);
    } else {
      setCurrentSymbol(symbol as keyof typeof adinkraSymbols);
    }
  }, [symbol]);
  
  const symbolSvg = adinkraSymbols[currentSymbol];
  
  // Determine animation class
  let animationClass = '';
  if (animate) {
    if (animate === 'spin') animationClass = 'animate-spin';
    else if (animate === 'pulse') animationClass = 'animate-pulse';
    else if (animate === 'float') animationClass = 'animate-float';
    else animationClass = 'animate-float'; // Default animation
  }
  
  const shadowStyle = withShadow 
    ? { filter: `drop-shadow(0 0 2px rgba(255, 215, 0, ${opacity * 0.8}))` } 
    : {};

  return (
    <div 
      className={`inline-flex adinkra-symbol ${animationClass} ${className}`}
      style={{ 
        width: size, 
        height: size, 
        color: color,
        opacity: opacity,
        ...shadowStyle,
        ...style
      }}
      dangerouslySetInnerHTML={{ __html: symbolSvg }}
    />
  );
};

export default AdinkraSymbol;
