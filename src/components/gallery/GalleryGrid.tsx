
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import GalleryItem from './GalleryItem';

export interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  filter: string;
  onImageClick: (image: GalleryImage) => void;
}

// Updated fallback images array with more reliable URLs
const fallbackImages = [
  "https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=1736&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544637378-a0ddf15e73c0?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1740&auto=format&fit=crop"
];

// Helper function to get a fallback image
export const getFallbackImage = (title: string) => {
  const index = title.length % fallbackImages.length;
  return fallbackImages[index];
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, filter, onImageClick }) => {
  const filteredImages = filter === "all" 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredImages.map((image, index) => (
        <GalleryItem 
          key={image.id}
          image={image}
          index={index}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
export { fallbackImages };
