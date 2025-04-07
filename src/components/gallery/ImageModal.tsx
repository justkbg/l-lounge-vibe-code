
import React, { useState, useEffect } from 'react';
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
  const [isAnimating, setIsAnimating] = useState(false);

  // Add entrance animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl p-0 overflow-hidden glass-card film-grain cinematic-vignette ${isAnimating ? 'scale-in-animation' : ''}`}>
        <div className="relative perspective-1000">
          <img 
            src={imageError ? getFallbackImageUrl(image.title) : image.image} 
            alt={image.title} 
            className="w-full h-full object-contain lens-flare dynamic-lighting"
            onError={() => setImageError(true)}
          />
          
          {/* Cinematic lighting overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at center, rgba(255,215,0,0.1) 0%, transparent 70%)',
            mixBlendMode: 'overlay'
          }}></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-playfair font-bold text-primary gold-shimmer">{image.title}</h3>
            <p className="text-white opacity-80 text-sm mt-1">Category: {image.category}</p>
          </div>
          
          {/* Enhanced decoration with AdinkraSymbol */}
          <div className="absolute top-4 right-4 animate-float">
            <AdinkraSymbol symbol="random" size={32} opacity={0.8} />
          </div>
          
          {/* Dramatic side light */}
          <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-[300%] rotate-12 pointer-events-none" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.1) 50%, rgba(255,215,0,0.2))',
            filter: 'blur(20px)',
            mixBlendMode: 'overlay'
          }}></div>
          
          {/* Bottom light reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{
            background: 'linear-gradient(to top, rgba(255,215,0,0.1), transparent)',
            mixBlendMode: 'overlay'
          }}></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
