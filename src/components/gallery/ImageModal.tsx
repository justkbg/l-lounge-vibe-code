
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GalleryImage } from './GalleryGrid';
import OptimizedImage from '@/components/OptimizedImage';

interface ImageModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setLoaded(false);
    }
  }, [isOpen, image]);
  
  if (!image) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95 border-none">
        <div className="relative w-full h-full">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 marcello-x w-8 h-8 bg-black/30 rounded-full p-6 flex items-center justify-center backdrop-blur-sm"
            aria-label="Close modal"
          />
          
          <div className="relative overflow-hidden max-h-[80vh]">
            <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <OptimizedImage
                src={image.image}
                alt={image.title}
                className="w-full max-h-[80vh] object-contain"
                fallbackIdentifier={image.title}
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-2xl font-playfair text-white gold-shimmer">{image.title}</h2>
              <div className="flex items-center mt-2">
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
