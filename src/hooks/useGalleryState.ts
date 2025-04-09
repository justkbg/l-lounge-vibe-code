
import { useState } from 'react';
import { GalleryImage } from '@/components/gallery/GalleryGrid';

export const useGalleryState = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  return {
    filter,
    setFilter,
    selectedImage,
    setSelectedImage,
    isModalOpen,
    setIsModalOpen,
    imagesLoaded,
    setImagesLoaded
  };
};
