
import React from 'react';
import { motion } from 'framer-motion';

const GalleryPageHeader: React.FC = () => {
  return (
    <div className="text-center mb-16 reveal-on-scroll">
      <motion.h1 
        className="section-title animate-fade-in text-4xl md:text-5xl font-playfair mb-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="gold-shimmer">Our Gallery</span>
        <span className="block h-1 w-20 bg-primary mx-auto mt-4 rounded"></span>
      </motion.h1>
      
      <motion.p 
        className="section-subtitle animate-fade-in text-lg md:text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Explore the ambiance, culinary delights, and memorable moments at L-Lounge
      </motion.p>
      
      {/* Marcello-inspired decorative elements */}
      <div className="flex justify-center mt-8 space-x-4">
        <motion.div 
          className="w-2 h-2 bg-primary rounded-full" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div 
          className="w-2 h-2 bg-primary rounded-full" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.div 
          className="w-2 h-2 bg-primary rounded-full" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </div>
    </div>
  );
};

export default GalleryPageHeader;
