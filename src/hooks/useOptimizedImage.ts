
import { useState, useEffect } from 'react';
import { getFallbackImageUrl } from '@/components/gallery/GalleryGrid';

interface UseOptimizedImageProps {
  src: string;
  alt: string;
  fallbackIdentifier?: string;
  priority?: boolean;
  placeholder?: string;
}

export const useOptimizedImage = ({ 
  src, 
  alt, 
  fallbackIdentifier,
  priority = false,
  placeholder
}: UseOptimizedImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [placeholderColor, setPlaceholderColor] = useState<string>(placeholder || 'rgba(10, 10, 10, 0.5)');
  
  useEffect(() => {
    // Don't load immediately if using lazy loading strategy
    if (!priority && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      return;
    }
    
    // Reset states when src changes
    setIsLoading(true);
    setIsError(false);
    
    // Create a new image to preload
    const img = new Image();
    
    // Add event listeners
    img.onload = () => {
      setImageUrl(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      // Calculate fallback based on alt text or identifier
      const fallback = getFallbackImageUrl(fallbackIdentifier || alt);
      setImageUrl(fallback);
      setIsLoading(false);
      setIsError(true);
      console.log(`Failed to load image: ${src}, using fallback: ${fallback}`);
    };
    
    // Start loading the image
    img.src = src;
    
    // Cleanup event listeners on unmount or when src changes
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, alt, fallbackIdentifier, priority]);
  
  return {
    imageUrl,
    isLoading,
    isError,
    placeholderColor
  };
};

// Advanced dominant color extraction (client-side approximation)
export const extractDominantColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      // Create a small canvas to sample colors
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Use a small sample size for performance
      canvas.width = 50;
      canvas.height = 50;
      
      if (!ctx) {
        resolve('rgba(10, 10, 10, 0.5)');
        return;
      }
      
      // Draw and sample
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      try {
        // Sample from middle of image
        const data = ctx.getImageData(
          canvas.width / 2, 
          canvas.height / 2, 
          1, 1
        ).data;
        
        // Create RGBA color
        const color = `rgba(${data[0]}, ${data[1]}, ${data[2]}, 0.5)`;
        resolve(color);
      } catch (e) {
        // Default fallback on error
        resolve('rgba(10, 10, 10, 0.5)');
      }
    };
    
    img.onerror = () => {
      resolve('rgba(10, 10, 10, 0.5)');
    };
    
    img.src = imageUrl;
  });
};
