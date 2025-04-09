
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import MarcelloShowcase from '@/components/marcello/MarcelloShowcase';

const MarcelloUI: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 relative animate-fade-in scroll-container">
        <AdinkraBackground 
          symbol="random" 
          density={0.15} 
          opacity={0.1} 
          animated={true} 
          cinematicEffect="float"
        />
        
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-playfair mb-6 text-center">
            <span className="gold-shimmer">Marcello Design System</span>
            <span className="block h-1 w-20 bg-primary mx-auto mt-4 rounded"></span>
          </h1>
          
          <p className="text-center text-lg md:text-xl max-w-2xl mx-auto mb-16">
            A luxurious design system inspired by high-end aesthetics
          </p>
          
          <MarcelloShowcase />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MarcelloUI;
