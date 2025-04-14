
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';
import AdinkraSymbol from './AdinkraSymbol';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  minDisplayTime?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadComplete,
  minDisplayTime = 2500
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [mainLoaded, setMainLoaded] = useState<boolean>(false);
  
  const symbolKeys = Object.keys(adinkraSymbols);
  
  const getRandomSymbol = () => {
    return symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let loadTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    
    // Simulated loading progress
    interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 10, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          setMainLoaded(true);
        }
        return newProgress;
      });
    }, 200);

    // Ensure minimum display time for loading screen
    loadTimeout = setTimeout(() => {
      setMainLoaded(true);
    }, minDisplayTime);
    
    return () => {
      clearInterval(interval);
      clearTimeout(loadTimeout);
      clearTimeout(hideTimeout);
    };
  }, [minDisplayTime]);
  
  // Once main content is loaded, start exit animation
  useEffect(() => {
    if (mainLoaded) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
        if (onLoadComplete) onLoadComplete();
      }, 500); // Allow time for the progress to reach 100%
      
      return () => clearTimeout(hideTimeout);
    }
  }, [mainLoaded, onLoadComplete]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                <AdinkraSymbol 
                  symbol={getRandomSymbol() as any} 
                  size={120}
                  color="var(--royal-gold)"
                  animate="pulse"
                  opacity={0.8}
                />
                
                {/* Gold ring animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-primary gold-shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              L-Lounge
            </motion.h1>
            
            <motion.p
              className="text-lg text-muted-foreground mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Ghana's Most Exclusive Lounge Experience
            </motion.p>
            
            {/* Progress bar */}
            <motion.div
              className="w-64 h-1 bg-muted relative overflow-hidden rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              ></motion.div>
            </motion.div>
            
            <motion.p
              className="text-sm text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
