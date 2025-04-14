
import { useState, useEffect } from 'react';
import { getFallbackImageUrl } from '@/components/gallery/GalleryGrid';

interface UseOptimizedImageProps {
  src: string;
  alt: string;
  fallbackIdentifier?: string;
}

export const useOptimizedImage = ({ src, alt, fallbackIdentifier }: UseOptimizedImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  
  useEffect(() => {
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
  }, [src, alt, fallbackIdentifier]);
  
  return {
    imageUrl,
    isLoading,
    isError
  };
};
