
import React, { useEffect, useRef } from 'react';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

interface AdinkraBackgroundProps {
  symbol?: keyof typeof adinkraSymbols | 'random';
  density?: number;
  opacity?: number;
  animated?: boolean;
}

const AdinkraBackground: React.FC<AdinkraBackgroundProps> = ({
  symbol = 'nyameNti',
  density = 0.5,
  opacity = 0.1,
  animated = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Clear previous symbols
    container.innerHTML = '';
    
    // Calculate number of symbols based on density
    const symbolSize = 80; // Increased from 60 for better visibility
    const spacing = symbolSize * (2 - density);
    
    const columns = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);
    
    // Create and position symbols
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.left = `${j * spacing + (Math.random() * spacing * 0.4)}px`;
        wrapper.style.top = `${i * spacing + (Math.random() * spacing * 0.4)}px`;
        wrapper.style.width = `${symbolSize}px`;
        wrapper.style.height = `${symbolSize}px`;
        wrapper.style.opacity = `${opacity}`;
        wrapper.style.color = 'currentColor';
        wrapper.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;
        wrapper.style.transition = 'transform 1s ease-in-out';
        
        if (animated) {
          const animDuration = 10 + Math.random() * 20;
          wrapper.style.animation = `float ${animDuration}s infinite ease-in-out`;
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
    
    // Add animation for hover interaction
    if (animated) {
      container.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        Array.from(container.children).forEach((element) => {
          const el = element as HTMLElement;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distanceX = (mouseX - centerX) / 20;
          const distanceY = (mouseY - centerY) / 20;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (distance < 10) {
            el.style.transform = `translateX(${distanceX}px) translateY(${distanceY}px) rotate(${Math.random() * 360}deg) scale(1.2)`;
            el.style.opacity = '0.3';
          }
        });
      });
      
      container.addEventListener('mouseleave', () => {
        Array.from(container.children).forEach((element) => {
          const el = element as HTMLElement;
          el.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;
          el.style.opacity = `${opacity}`;
        });
      });
    }
    
    return () => {
      container.innerHTML = '';
    };
  }, [symbol, density, opacity, animated]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'overlay',
        color: 'var(--royal-gold)'  // Set default color to gold for better visibility
      }}
    />
  );
};

export default AdinkraBackground;
