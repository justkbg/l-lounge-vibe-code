
import { useState, useEffect } from 'react';

// More reliable fallback images with absolute URLs
const fallbackImages = [
  "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=1736&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544637378-a0ddf15e73c0?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1758&auto=format&fit=crop"
];

export const useFallbackImage = (initialImage: string, identifier: string = '') => {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [imageError, setImageError] = useState(false);

  // Get a deterministic fallback image based on the identifier
  const getFallbackImage = () => {
    const index = identifier.length % fallbackImages.length;
    return fallbackImages[index];
  };

  useEffect(() => {
    // Try loading the initial image
    const img = new Image();
    img.src = initialImage;
    
    img.onload = () => {
      setImageUrl(initialImage);
      setImageError(false);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${initialImage}, using fallback`);
      setImageUrl(getFallbackImage());
      setImageError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [initialImage, identifier]);

  return { imageUrl, imageError, getFallbackImage };
};
