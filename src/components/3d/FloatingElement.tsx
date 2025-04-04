
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  depth?: number;
  sensitivity?: number;
  className?: string;
  glowColor?: string;
  hoverScale?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  depth = 20,
  sensitivity = 0.05,
  className,
  glowColor = "rgba(255, 215, 0, 0.3)",
  hoverScale = 1.05
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    let bounds: DOMRect;
    let mouseX = 0;
    let mouseY = 0;
    let elementX = 0;
    let elementY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      bounds = element.getBoundingClientRect();
      
      // Get mouse position relative to element
      mouseX = e.clientX - bounds.left - bounds.width / 2;
      mouseY = e.clientY - bounds.top - bounds.height / 2;
    };
    
    const animateFloat = () => {
      if (!element) return;
      
      // Smooth transition of element position
      elementX += (mouseX * sensitivity - elementX) * 0.1;
      elementY += (mouseY * sensitivity - elementY) * 0.1;
      
      // Apply 3D transform
      element.style.transform = `
        perspective(1000px)
        rotateX(${-elementY / depth}deg)
        rotateY(${elementX / depth}deg)
        translateZ(10px)
      `;
      
      requestAnimationFrame(animateFloat);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animateFloat);
    
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      element.style.boxShadow = `0 0 20px ${glowColor}`;
      element.style.transform = `
        perspective(1000px)
        rotateX(${-elementY / depth}deg)
        rotateY(${elementX / depth}deg)
        translateZ(20px)
        scale(${hoverScale})
      `;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      element.style.boxShadow = 'none';
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
      
      // Reset positions
      mouseX = 0;
      mouseY = 0;
      elementX = 0;
      elementY = 0;
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [depth, sensitivity, glowColor, hoverScale]);
  
  return (
    <div 
      ref={elementRef}
      className={cn(
        "transform-gpu preserve-3d transition-transform",
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
