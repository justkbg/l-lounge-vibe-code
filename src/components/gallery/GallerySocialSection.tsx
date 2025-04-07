
import React from 'react';
import InstagramFeed from '@/components/InstagramFeed';

const GallerySocialSection: React.FC = () => {
  return (
    <div className="mt-20 reveal-on-scroll">
      <h2 className="section-title mb-4">Follow Us on Instagram</h2>
      <p className="section-subtitle mb-10">
        Stay updated with our latest events, dishes, and moments
      </p>
      
      <InstagramFeed />
    </div>
  );
};

export default GallerySocialSection;
