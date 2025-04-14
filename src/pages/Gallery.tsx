
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import GalleryPageContent from '@/components/gallery/GalleryPageContent';
import ContactInfo from '@/components/ContactInfo';
import { preloadCriticalImages } from '@/utils/imageLoader';
import { getFeaturedImages } from '@/data/galleryData';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Preload critical images for the gallery
  useEffect(() => {
    const featuredImages = getFeaturedImages();
    const imageUrls = featuredImages.map(img => img.image);
    
    // Start with a minimum loading time
    const loadingPromise = new Promise(resolve => setTimeout(resolve, 1000));
    
    // Preload featured images
    Promise.all([
      preloadCriticalImages(imageUrls),
      loadingPromise
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  // Enhanced cinematic animation classes
  const pageEnterClasses = "animate-fade-in transition-all duration-700";

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Item variants for elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className={`pt-24 pb-20 relative ${pageEnterClasses} scroll-container film-grain`}>
        {/* Add Adinkra background with enhanced animation */}
        <AdinkraBackground 
          symbol="random" 
          density={0.2} 
          opacity={0.15} 
          animated={true} 
          cinematicEffect="float"
          size={60}
        />
        
        <AnimatePresence>
          {isLoading ? (
            <motion.div 
              className="flex items-center justify-center h-[60vh]"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="loading-adinkra">
                <motion.div
                  animate={{ 
                    rotateZ: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotateZ: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <path 
                      fill="#D4AF37" 
                      d="M50,10 L90,50 L50,90 L10,50 Z M50,30 L70,50 L50,70 L30,50 Z"
                    ></path>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-playfair font-bold text-center text-primary mb-4"
                variants={itemVariants}
              >
                Our Gallery
              </motion.h1>
              
              <motion.p 
                className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16"
                variants={itemVariants}
              >
                Explore the vibrant atmosphere and unforgettable moments at L-Lounge Ghana
              </motion.p>
              
              <GalleryPageContent />
              
              {/* Location and Contact Information */}
              <motion.div 
                className="container-custom my-16 text-center"
                variants={itemVariants}
              >
                <div className="marcello-divider"></div>
                <ContactInfo showSocials={true} showHours={true} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
