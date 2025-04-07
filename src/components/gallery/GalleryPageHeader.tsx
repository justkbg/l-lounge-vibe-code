
import React from 'react';

const GalleryPageHeader: React.FC = () => {
  return (
    <div className="text-center mb-16 reveal-on-scroll">
      <h1 className="section-title animate-fade-in">Our Gallery</h1>
      <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Explore the ambiance, culinary delights, and memorable moments at L-Lounge
      </p>
    </div>
  );
};

export default GalleryPageHeader;
