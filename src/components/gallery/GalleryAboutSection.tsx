
import React from 'react';
import AboutLounge from '@/components/AboutLounge';
import { motion } from 'framer-motion';

const GalleryAboutSection: React.FC = () => {
  return (
    <div className="mt-20 mb-16 reveal-on-scroll relative">
      <motion.h2 
        className="section-title mb-4 font-playfair text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        About L-Lounge
      </motion.h2>
      
      <motion.p 
        className="section-subtitle mb-10 max-w-2xl mx-auto text-base md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        A premier bar and grill in Sakumono, Ghana, offering an exceptional experience
      </motion.p>
      
      {/* Decorative X element inspired by Marcello */}
      <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 hidden md:block">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L28 28M2 28L28 2" stroke="var(--royal-gold)" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <AboutLounge />
      </motion.div>
      
      {/* Background decoration - inspired by Marcello X */}
      <div className="absolute right-0 bottom-0 w-40 h-40 opacity-5 pointer-events-none">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10L150 150M10 150L150 10" stroke="var(--royal-gold)" strokeWidth="20" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default GalleryAboutSection;
