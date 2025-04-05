
import React, { useEffect, useRef } from 'react';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

interface AdinkraBackgroundProps {
  symbol?: keyof typeof adinkraSymbols | 'random';
  density?: number;
  opacity?: number;
  animated?: boolean;
  cinematicEffect?: 'rotate' | 'pulse' | 'float' | 'none';
  size?: number;
}

const AdinkraBackground: React.FC<AdinkraBackgroundProps> = ({
  symbol = 'random',
  density = 0.3, // Lower density for better performance
  opacity = 0.15, // Lower default opacity for subtlety
  animated = true,
  cinematicEffect = 'float',
  size = 80 // Smaller default size
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Clear previous symbols
    container.innerHTML = '';
    
    // Calculate number of symbols based on density
    const symbolSize = size;
    const spacing = symbolSize * (2 - density);
    
    const columns = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);
    
    // Create and position symbols
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // Add randomness to symbol placement
        if (Math.random() > density) continue;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.left = `${j * spacing + (Math.random() * spacing * 0.4)}px`;
        wrapper.style.top = `${i * spacing + (Math.random() * spacing * 0.4)}px`;
        wrapper.style.width = `${symbolSize}px`;
        wrapper.style.height = `${symbolSize}px`;
        wrapper.style.opacity = `${opacity * (0.7 + Math.random() * 0.5)}`; // Varied opacity
        wrapper.style.color = 'var(--royal-gold)';
        wrapper.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.4})`;
        wrapper.style.transition = 'transform 1s ease-in-out, opacity 0.5s ease-in-out';
        wrapper.classList.add('adinkra-symbol');
        wrapper.setAttribute('data-parallax', '');
        wrapper.setAttribute('data-speed', `${0.02 + Math.random() * 0.1}`);
        wrapper.setAttribute('data-direction', 'combined');
        
        // Apply cinematic animation based on effect type
        if (animated) {
          const animDuration = 10 + Math.random() * 15; // Less variance for subtlety
          
          switch(cinematicEffect) {
            case 'rotate':
              wrapper.style.animation = `spin ${animDuration}s infinite linear`;
              break;
            case 'pulse':
              wrapper.style.animation = `pulse-glow ${animDuration / 2}s infinite ease-in-out`;
              break;
            case 'float':
            default:
              wrapper.style.animation = `float ${animDuration}s infinite ease-in-out`;
              break;
          }
        }
        
        // Randomly select a symbol if 'random' is specified
        let symbolToUse = symbol as keyof typeof adinkraSymbols;
        if (symbol === 'random') {
          const symbolKeys = Object.keys(adinkraSymbols) as Array<keyof typeof adinkraSymbols>;
          symbolToUse = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
        }
          
        wrapper.innerHTML = adinkraSymbols[symbolToUse];
        container.appendChild(wrapper);
      }
    }
    
    // Add interactive animation for hover and scroll effects
    if (animated) {
      // Mouse movement effect - more subtle
      container.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        Array.from(container.children).forEach((element) => {
          const el = element as HTMLElement;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distanceX = (mouseX - centerX) / 30; // Reduced sensitivity
          const distanceY = (mouseY - centerY) / 30;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (distance < 10) { // Smaller interaction radius
            el.style.transform = `translateX(${distanceX}px) translateY(${distanceY}px) rotate(${Math.random() * 360}deg) scale(1.2)`;
            el.style.opacity = `${opacity * 2}`; // Boosted opacity but still subtle
            el.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
          }
        });
      });
    }
    
    return () => {
      container.innerHTML = '';
      
      // Clean up event listeners
      container.removeEventListener('mousemove', () => {});
      container.removeEventListener('mouseleave', () => {});
    };
  }, [symbol, density, opacity, animated, cinematicEffect, size]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'overlay',
        color: 'var(--royal-gold)'
      }}
    />
  );
};

export default AdinkraBackground;
