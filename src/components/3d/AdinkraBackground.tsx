
import React, { useEffect, useRef } from 'react';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

interface AdinkraBackgroundProps {
  symbol?: keyof typeof adinkraSymbols | 'random';
  density?: number;
  opacity?: number;
  animated?: boolean;
  cinematicEffect?: 'rotate' | 'pulse' | 'float' | 'none';
}

const AdinkraBackground: React.FC<AdinkraBackgroundProps> = ({
  symbol = 'nyameNti',
  density = 0.5,
  opacity = 0.2, // Increased default opacity for better visibility
  animated = true,
  cinematicEffect = 'float'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Clear previous symbols
    container.innerHTML = '';
    
    // Calculate number of symbols based on density
    const symbolSize = 120; // Increased from 100 for better visibility
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
        wrapper.style.color = 'var(--royal-gold)'; // Ensure consistent gold color
        wrapper.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;
        wrapper.style.transition = 'transform 1s ease-in-out, opacity 0.5s ease-in-out';
        wrapper.classList.add('adinkra-symbol');
        
        // Apply cinematic animation based on effect type
        if (animated) {
          const animDuration = 10 + Math.random() * 20;
          
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
      // Mouse movement effect
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
          
          if (distance < 15) { // Increased interaction radius
            el.style.transform = `translateX(${distanceX}px) translateY(${distanceY}px) rotate(${Math.random() * 360}deg) scale(1.5)`;
            el.style.opacity = '0.8'; // Increased opacity for better interaction feedback
            el.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
          }
        });
      });
      
      container.addEventListener('mouseleave', () => {
        Array.from(container.children).forEach((element) => {
          const el = element as HTMLElement;
          el.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;
          el.style.opacity = `${opacity}`;
          el.style.transition = 'transform 1s ease-in-out, opacity 0.5s ease-in-out';
        });
      });
      
      // Scroll effect for cinematic feel
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        Array.from(container.children).forEach((element, index) => {
          const el = element as HTMLElement;
          
          // Create differential movement based on symbol position
          const rowPosition = Math.floor(index / columns);
          const scrollSpeed = 0.05 + (rowPosition % 3) * 0.02;
          
          // Different effects based on position
          if (index % 4 === 0) {
            el.style.transform = `translateY(${scrollY * scrollSpeed}px) rotate(${scrollY * 0.02}deg)`;
          } else if (index % 4 === 1) {
            el.style.transform = `translateY(${-scrollY * scrollSpeed}px) rotate(${-scrollY * 0.02}deg)`;
          } else if (index % 4 === 2) {
            el.style.transform = `translateX(${scrollY * scrollSpeed}px) scale(${1 + scrollY * 0.0005})`;
          } else {
            el.style.transform = `translateX(${-scrollY * scrollSpeed}px) scale(${1 - scrollY * 0.0003})`;
          }
        });
      });
    }
    
    return () => {
      container.innerHTML = '';
      
      // Clean up event listeners
      container.removeEventListener('mousemove', () => {});
      container.removeEventListener('mouseleave', () => {});
      window.removeEventListener('scroll', () => {});
    };
  }, [symbol, density, opacity, animated, cinematicEffect]);

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
