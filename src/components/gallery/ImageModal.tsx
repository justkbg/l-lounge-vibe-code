
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GalleryImage, getFallbackImageUrl } from './GalleryGrid';
import AdinkraSymbol from '@/components/AdinkraSymbol';

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
            src={imageError ? getFallbackImageUrl(image.title) : image.image} 
            alt={image.title} 
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-playfair font-bold text-primary gold-shimmer">{image.title}</h3>
            <p className="text-white opacity-80 text-sm mt-1">Category: {image.category}</p>
          </div>
          
          {/* Enhanced decoration with AdinkraSymbol */}
          <div className="absolute top-4 right-4">
            <AdinkraSymbol symbol="random" size={24} opacity={0.7} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
