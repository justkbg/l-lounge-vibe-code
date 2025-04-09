
import React from 'react';
import GalleryPageHeader from '@/components/gallery/GalleryPageHeader';
import GalleryContainer from '@/components/gallery/GalleryContainer';
import GalleryAboutSection from '@/components/gallery/GalleryAboutSection';
import GallerySocialSection from '@/components/gallery/GallerySocialSection';
import { motion } from 'framer-motion';

const GalleryPageContent: React.FC = () => {
  return (
    <div className="container-custom">
      <GalleryPageHeader />
      <GalleryContainer />
      
      {/* Decorative X marker - Marcello inspired */}
      <motion.div 
        className="flex justify-center my-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="marcello-x"></div>
      </motion.div>
      
      <GalleryAboutSection />
      <GallerySocialSection />
    </div>
  );
};

export default GalleryPageContent;
