
import React from 'react';
import InstagramFeed from '@/components/InstagramFeed';
import { motion } from 'framer-motion';

const GallerySocialSection: React.FC = () => {
  return (
    <div className="mt-20 reveal-on-scroll relative overflow-hidden">
      <motion.h2 
        className="section-title mb-4 font-playfair text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Follow Us on Instagram
      </motion.h2>
      
      <motion.p 
        className="section-subtitle mb-10 max-w-2xl mx-auto text-base md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Stay updated with our latest events, dishes, and moments
      </motion.p>
      
      {/* Marcello-inspired decorative lines */}
      <div className="flex justify-center space-x-8 mb-8">
        <motion.div 
          className="w-16 h-0.5 bg-primary" 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div 
          className="w-16 h-0.5 bg-primary" 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div 
          className="w-16 h-0.5 bg-primary" 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <InstagramFeed />
      </motion.div>
      
      {/* X-inspired corner element */}
      <div className="absolute left-10 bottom-10 w-20 h-20 opacity-10 rotate-45 transform pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5L75 75M5 75L75 5" stroke="var(--royal-gold)" strokeWidth="10" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default GallerySocialSection;
