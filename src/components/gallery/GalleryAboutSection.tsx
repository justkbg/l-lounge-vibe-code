
import React from 'react';
import AboutLounge from '@/components/AboutLounge';

const GalleryAboutSection: React.FC = () => {
  return (
    <div className="mt-20 mb-16 reveal-on-scroll">
      <h2 className="section-title mb-4">About L-Lounge</h2>
      <p className="section-subtitle mb-10">
        A premier bar and grill in Sakumono, Ghana, offering an exceptional experience
      </p>
      
      <AboutLounge />
    </div>
  );
};

export default GalleryAboutSection;
