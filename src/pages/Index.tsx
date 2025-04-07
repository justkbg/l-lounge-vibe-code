
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import BentoGridSection from '@/components/home/BentoGridSection';

const Index: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BentoGridSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
