
import React, { useState, useEffect } from 'react';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  fallbackIdentifier?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = 'rgba(0,0,0,0.1)',
  fallbackIdentifier,
  priority = false
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const { imageUrl, isLoading } = useOptimizedImage({ 
    src, 
    alt, 
    fallbackIdentifier 
  });
  
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
    }, { rootMargin: '200px' });
    
    const elementId = `img-${src.replace(/[^\w]/g, '')}`;
    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [src, priority]);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  const imgClasses = `
    ${className}
    ${!isLoaded ? 'opacity-0' : 'opacity-100'}
    transition-opacity duration-500
  `;
  
  return (
    <div 
      id={`img-${src.replace(/[^\w]/g, '')}`}
      className="progressive-image relative"
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="progressive-image-placeholder absolute inset-0" 
          style={{ backgroundColor: placeholderColor }}
        ></div>
      )}
      
      {/* Actual image - only load when in viewport or priority */}
      {isVisible && (
        <img
          src={imageUrl}
          alt={alt}
          className={imgClasses}
          onLoad={handleImageLoad}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
