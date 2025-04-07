
import React from 'react';

interface BentoCardContentProps {
  title: string;
  description: string;
  isHovered: boolean;
  symbolSvg: string;
}

const BentoCardContent: React.FC<BentoCardContentProps> = ({ 
  title, 
  description, 
  isHovered,
  symbolSvg
}) => {
  return (
    <div className="relative z-10 h-full flex flex-col justify-end p-6">
      <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary kente-border gold-shimmer">{title}</h3>
      <p className="text-sm md:text-base text-white mb-4 max-w-xs">{description}</p>
      <span className="text-primary text-sm font-medium inline-flex items-center gap-1 transition-transform group-hover:translate-x-2 neo-glow py-1 px-2 rounded">
        Explore more
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
      
      {/* Animated elements on hover */}
      {isHovered && (
        <>
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FBC02D] opacity-70 animate-pulse lens-flare"></div>
          <div 
            className="absolute bottom-4 left-4 w-8 h-8 opacity-80 filter drop-shadow-lg"
            dangerouslySetInnerHTML={{ __html: symbolSvg }}
            style={{ 
              animation: 'spin 4s linear infinite, pulse-glow 2s ease-in-out infinite',
              color: '#FFD700'
            }}
          />
        </>
      )}
    </div>
  );
};

export default BentoCardContent;
