
import React from 'react';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

interface AdinkraSymbolProps {
  symbol?: keyof typeof adinkraSymbols | 'random';
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean | 'spin' | 'pulse' | 'float';
}

const AdinkraSymbol: React.FC<AdinkraSymbolProps> = ({
  symbol = 'nyameNti',
  size = 40,
  color = 'currentColor',
  className = '',
  style = {},
  animate = false
}) => {
  // Handle random symbol selection
  const getSymbolKey = (): keyof typeof adinkraSymbols => {
    if (symbol === 'random') {
      const symbolKeys = Object.keys(adinkraSymbols) as Array<keyof typeof adinkraSymbols>;
      return symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
    }
    return symbol;
  };

  const symbolKey = getSymbolKey();
  const symbolSvg = adinkraSymbols[symbolKey];
  
  // Determine animation class
  let animationClass = '';
  if (animate) {
    if (animate === 'spin') animationClass = 'animate-spin';
    else if (animate === 'pulse') animationClass = 'animate-pulse';
    else if (animate === 'float') animationClass = 'animate-float';
    else animationClass = 'animate-float'; // Default animation
  }

  return (
    <div 
      className={`inline-flex ${animationClass} ${className}`}
      style={{ 
        width: size, 
        height: size, 
        color: color,
        ...style
      }}
      dangerouslySetInnerHTML={{ __html: symbolSvg }}
    />
  );
};

export default AdinkraSymbol;
