
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import BentoGridSection from '@/components/home/BentoGridSection';
import ContactInfo from '@/components/ContactInfo';
import { initCinematicScroll } from '@/utils/cinematicScroll';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Initialize cinematic scroll effects when component mounts
  useEffect(() => {
    // Create scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'fixed bottom-0 left-0 h-1 bg-primary z-50';
    document.body.appendChild(scrollProgress);
    
    const updateScrollProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / windowHeight;
      scrollProgress.style.width = `${scrolled * 100}%`;
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Give a moment for the DOM to settle before initializing scroll effects
    const timer = setTimeout(() => {
      initCinematicScroll({
        cursorTrail: true,
        spotlightEffect: true,
        adinkraParallax: true
      });
      setIsLoaded(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateScrollProgress);
      if (scrollProgress.parentNode) {
        scrollProgress.parentNode.removeChild(scrollProgress);
      }
    };
  }, []);
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home-page"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="overflow-hidden film-grain"
      >
        <Navbar />
        <main ref={mainRef} className="scroll-container relative">
          <HeroSection />
          <AboutSection />
          <BentoGridSection />
          
          {/* Add Contact Information to homepage */}
          <section className="py-16 relative">
            <div className="container-custom text-center">
              <motion.h2 
                className="section-title gsap-reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Visit Us
              </motion.h2>
              <div className="marcello-divider my-8"></div>
              <ContactInfo showTitle={false} showSocials={true} showHours={true} />
            </div>
          </section>
          
          {/* This element enables cinematic scene transitions */}
          <div className="scene-transition"></div>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
