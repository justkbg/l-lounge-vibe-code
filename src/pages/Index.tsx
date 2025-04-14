
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import BentoGridSection from '@/components/home/BentoGridSection';
import ContactInfo from '@/components/ContactInfo';
import { initCinematicScroll } from '@/utils/cinematicScroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Initialize GSAP animations
  useGSAP(() => {
    // Create a timeline for each section
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });
      
      // Animate section elements
      tl.fromTo(
        section.querySelectorAll('.gsap-reveal'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power2.out' }
      );
    });
    
    // Create parallax effect for hero background
    gsap.to('.hero-bg-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Initialize scrolling status indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'fixed bottom-0 left-0 h-1 bg-primary z-50';
    document.body.appendChild(scrollProgress);
    
    gsap.to(scrollProgress, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
    
  }, { scope: mainRef });
  
  // Initialize cinematic scroll effects when component mounts
  useEffect(() => {
    // Give a moment for the DOM to settle before initializing scroll effects
    const timer = setTimeout(() => {
      initCinematicScroll({
        cursorTrail: true,
        spotlightEffect: true,
        adinkraParallax: true
      });
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
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
