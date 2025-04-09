
import React, { useState, useEffect } from 'react';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  fallbackIdentifier?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = 'rgba(0,0,0,0.1)',
  fallbackIdentifier
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { imageUrl, isLoading } = useOptimizedImage({ 
    src, 
    alt, 
    fallbackIdentifier 
  });
  
  useEffect(() => {
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    
    const element = document.getElementById(`img-${src.replace(/[^\w]/g, '')}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [src]);
  
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
      className="progressive-image"
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="progressive-image-placeholder" 
          style={{ backgroundColor: placeholderColor }}
        ></div>
      )}
      
      {/* Actual image - only load when in viewport */}
      {isVisible && (
        <img
          src={imageUrl}
          alt={alt}
          className={imgClasses}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
