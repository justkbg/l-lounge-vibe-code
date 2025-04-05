
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GalleryImage, getFallbackImage } from './GalleryGrid';

interface ImageModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden glass-card">
        <div className="relative">
          <img 
            src={imageError ? getFallbackImage(image.title) : image.image} 
            alt={image.title} 
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-playfair font-bold text-primary gold-shimmer">{image.title}</h3>
            <p className="text-white opacity-80 text-sm mt-1">Category: {image.category}</p>
          </div>
          
          {/* Add decoration */}
          <div className="absolute top-4 right-4 w-8 h-8 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path fill="currentColor" className="text-primary" d="M50,10 L90,50 L50,90 L10,50 Z M50,30 L70,50 L50,70 L30,50 Z"/>
            </svg>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
