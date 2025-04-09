
import React, { useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import ImageModal from '@/components/gallery/ImageModal';
import FilterButtons from '@/components/gallery/FilterButtons';
import { useGalleryState } from '@/hooks/useGalleryState';
import { useGalleryEffects } from '@/hooks/useGalleryEffects';

// Gallery categories
const categories = [
  { id: "all", name: "All" },
  { id: "interior", name: "Interior" },
  { id: "food", name: "Food" },
  { id: "drinks", name: "Drinks" },
  { id: "events", name: "Events" }
];

const GalleryContainer: React.FC = () => {
  const { filter, setFilter, selectedImage, setSelectedImage, isModalOpen, setIsModalOpen, imagesLoaded, setImagesLoaded } = useGalleryState();
  const galleryRef = useRef<HTMLDivElement>(null);

  // Initialize effects
  useGalleryEffects(galleryRef, filter, imagesLoaded, setImagesLoaded);

  // Modal handlers
  const openModal = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="gallery-container" ref={galleryRef}>
      <FilterButtons 
        categories={categories} 
        activeFilter={filter} 
        onFilterChange={setFilter}
      />

      <GalleryGrid 
        filter={filter} 
        onImageClick={openModal}
      />
      
      <ImageModal 
        image={selectedImage} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default GalleryContainer;
