
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + Math.random() * 15;
        return newValue >= 100 ? 100 : newValue;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (progress >= 100) {
      // Complete loading animation then hide loader
      setTimeout(() => {
        setShowLoader(false);
        if (onLoadComplete) onLoadComplete();
      }, 500);
    }
  }, [progress, onLoadComplete]);
  
  if (!showLoader) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: showLoader ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48">
        <motion.div
          className="absolute inset-0 marcello-x-pattern opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-playfair gold-shimmer">L</span>
        </div>
      </div>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full mt-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary/50 to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground font-playfair">
        {progress < 100 ? 'Loading experience...' : 'Enjoy your stay'}
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
