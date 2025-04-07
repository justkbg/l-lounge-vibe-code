
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import BentoGridSection from '@/components/home/BentoGridSection';
import { initCinematicScroll } from '@/utils/cinematicScroll';

const Index: React.FC = () => {
  // Initialize cinematic scroll effects when component mounts
  useEffect(() => {
    initCinematicScroll();
  }, []);

  return (
    <div className="scroll-container">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BentoGridSection />
      </main>
      <Footer />
      
      {/* This element enables cinematic scene transitions */}
      <div className="scene-transition"></div>
    </div>
  );
};

export default Index;
