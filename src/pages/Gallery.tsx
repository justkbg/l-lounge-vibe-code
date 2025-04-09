
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import GalleryPageContent from '@/components/gallery/GalleryPageContent';
import ContactInfo from '@/components/ContactInfo';

const Gallery = () => {
  // Enhanced cinematic animation classes
  const pageEnterClasses = "animate-fade-in transition-all duration-700";

  return (
    <>
      <Navbar />
      <main className={`pt-24 pb-20 relative ${pageEnterClasses} scroll-container`}>
        {/* Add Adinkra background with enhanced animation */}
        <AdinkraBackground 
          symbol="random" 
          density={0.2} 
          opacity={0.15} 
          animated={true} 
          cinematicEffect="float"
        />
        
        <GalleryPageContent />
        
        {/* Location and Contact Information */}
        <div className="container-custom my-16 text-center">
          <div className="marcello-divider"></div>
          <ContactInfo />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
