
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import GalleryPageHeader from '@/components/gallery/GalleryPageHeader';
import GalleryContainer from '@/components/gallery/GalleryContainer';
import GalleryAboutSection from '@/components/gallery/GalleryAboutSection';
import GallerySocialSection from '@/components/gallery/GallerySocialSection';

const Gallery = () => {
  // Enhanced cinematic animation classes
  const pageEnterClasses = "animate-fade-in transition-all duration-700";

  return (
    <>
      <Navbar />
      <main className={`pt-24 pb-20 relative ${pageEnterClasses}`}>
        {/* Add Adinkra background with enhanced animation */}
        <AdinkraBackground 
          symbol="random" 
          density={0.2} 
          opacity={0.15} 
          animated={true} 
          cinematicEffect="float"
        />
        
        <div className="container-custom">
          <GalleryPageHeader />
          <GalleryContainer />
          <GalleryAboutSection />
          <GallerySocialSection />
        </div>
      </main>
      <Footer />
      
      {/* This element enables cinematic scene transitions */}
      <div className="scene-transition"></div>
    </>
  );
};

export default Gallery;
