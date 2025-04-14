
import React, { useState, useEffect, useRef } from 'react';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  fallbackIdentifier?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
  withParallax?: boolean;
  parallaxSpeed?: number;
  cinematic?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = 'rgba(0,0,0,0.1)',
  fallbackIdentifier,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  withParallax = false,
  parallaxSpeed = 0.1,
  cinematic = false
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const { imageUrl, isLoading, placeholderColor: dominantColor } = useOptimizedImage({ 
    src, 
    alt, 
    fallbackIdentifier,
    priority,
    placeholder: placeholderColor
  });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If priority is true, load immediately without observer
    if (priority) {
      setIsVisible(true);
      return;
    }
    
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, { 
      rootMargin: '200px', // Load images before they appear in viewport
      threshold: 0.01 // Trigger with just 1% visible
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [src, priority]);
  
  // Add parallax effect on scroll
  useEffect(() => {
    if (!withParallax || !imageRef.current) return;
    
    const handleScroll = () => {
      if (!imageRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if the element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate parallax offset
        const scrollPosition = window.scrollY;
        const elementOffset = rect.top + scrollPosition;
        const relativeScroll = scrollPosition - elementOffset;
        const parallaxOffset = relativeScroll * parallaxSpeed;
        
        // Apply the parallax effect
        imageRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [withParallax, parallaxSpeed]);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  const imgClasses = `
    ${className}
    ${!isLoaded ? 'opacity-0' : 'opacity-100'}
    transition-opacity duration-700
    ${withParallax ? 'absolute inset-0 w-full h-full' : ''}
    ${cinematic ? 'cinematic-vignette' : ''}
  `;
  
  return (
    <div 
      ref={containerRef}
      className={`progressive-image relative overflow-hidden ${withParallax ? 'overflow-hidden' : ''} ${cinematic ? 'cinematic-depth' : ''}`}
      style={{ ...(withParallax ? { position: 'relative', overflow: 'hidden' } : {}) }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="progressive-image-placeholder absolute inset-0" 
          style={{ 
            backgroundColor: dominantColor || placeholderColor,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
      
      {/* Actual image - only load when in viewport or priority */}
      {isVisible && (
        <img
          ref={imageRef}
          src={imageUrl}
          alt={alt}
          className={imgClasses}
          style={{ objectFit, objectPosition }}
          onLoad={handleImageLoad}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      )}
      
      {/* Cinematic effect overlay */}
      {cinematic && isLoaded && (
        <div className="absolute inset-0 mix-blend-overlay pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
          <div className="absolute inset-0 adinkra-pattern opacity-10"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
