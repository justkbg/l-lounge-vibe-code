
// Function to preload critical images
export const preloadCriticalImages = (imageSources: string[]): Promise<void> => {
  const promises = imageSources.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve();
      };
      
      img.onerror = () => {
        console.log(`Failed to preload image: ${src}`);
        resolve(); // Resolve anyway to not block loading
      };
      
      img.src = src;
    });
  });
  
  return Promise.all(promises).then(() => {
    console.log('Critical images preloaded');
    return;
  });
};

// Function to get optimized image size based on device
export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  // For Unsplash images, we can use their optimization URL parameters
  if (url.includes('unsplash.com')) {
    const hasParams = url.includes('?');
    const connector = hasParams ? '&' : '?';
    return `${url}${connector}w=${width}&q=80&auto=format&fit=crop`;
  }
  
  // For other images, return as is (no optimization available)
  return url;
};

// Function to extract dominant color from an image
// This would typically be done server-side, but for client-side we'll use a simplified approach
export const extractDominantColor = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    // Default to a neutral dark color if we can't extract
    resolve('rgba(10, 10, 10, 0.5)');
  });
};
