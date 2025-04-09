
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
    setIsLoading(true);
    setIsError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageUrl(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      // Use fallback image
      const fallback = getFallbackImageUrl(fallbackIdentifier || alt);
      setImageUrl(fallback);
      setIsLoading(false);
      setIsError(true);
      console.log(`Failed to load image: ${src}, using fallback`);
    };
    
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
