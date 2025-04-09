
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { galleryImages } from '@/data/galleryData';

export const useGalleryEffects = (
  galleryRef: React.RefObject<HTMLDivElement>,
  filter: string,
  imagesLoaded: number,
  setImagesLoaded: (count: number) => void
) => {
  // Add cinematic scroll appearance for gallery items
  useEffect(() => {
    const elements = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [filter]); // Re-run when filter changes

  // Initialize cinematic scroll effects when component mounts
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) {
      // Add the scroll-container class to the main element
      const mainElement = galleryRef.current?.parentElement;
      if (mainElement) mainElement.classList.add('scroll-container');
    }
  }, []);

  // Preload images
  useEffect(() => {
    // Preload all images with improved error handling
    let loadedCount = 0;
    
    galleryImages.forEach((image) => {
      const img = new Image();
      img.src = image.image;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        if (loadedCount === galleryImages.length) {
          toast({
            title: "Gallery loaded",
            description: "All images have been successfully loaded.",
          });
        }
      };
      
      img.onerror = () => {
        console.log(`Failed to load image: ${image.image}, using fallback`);
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
    });
    
    // Fallback timer in case images take too long
    const timer = setTimeout(() => {
      if (imagesLoaded < galleryImages.length) {
        toast({
          title: "Gallery ready",
          description: "You can now explore our gallery.",
        });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
};
