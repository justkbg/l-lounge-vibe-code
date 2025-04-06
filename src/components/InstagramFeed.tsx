
import React, { useState, useEffect } from 'react';
import AdinkraSymbol from './AdinkraSymbol';
import { useFallbackImage } from '@/hooks/useFallbackImage';

// Mock Instagram photos (would be replaced with real API data)
const instagramPhotos = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    caption: 'Enjoy our premium lounge experience tonight! #LLounge #Accra',
    likes: 156,
    date: '2023-11-12'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    caption: 'Our signature cocktails are waiting for you #Cocktails #Premium',
    likes: 132,
    date: '2023-11-08'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1370&q=80',
    caption: 'New menu items just launched! Come try them out. #FoodLovers',
    likes: 201,
    date: '2023-11-05'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    caption: 'Weekend vibes at L-Lounge #WeekendParty #DJNight',
    likes: 188,
    date: '2023-10-28'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1544931770-3f0a3e93eabc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1526&q=80',
    caption: 'Private dining area available for reservations #PrivateDining',
    likes: 112,
    date: '2023-10-22'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    caption: 'Live band performance every Friday! #LiveMusic #Accra',
    likes: 234,
    date: '2023-10-15'
  },
];

interface InstagramFeedProps {
  limit?: number;
  className?: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ limit = 6, className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(instagramPhotos.slice(0, limit));
  
  // Simulate loading for visual effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="loading-adinkra"></div>
      </div>
    );
  }

  return (
    <div className={`instagram-feed ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, index) => (
          <InstagramPost key={photo.id} photo={photo} index={index} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <a 
          href="https://www.instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Follow us on Instagram
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
    </div>
  );
};

interface InstagramPostProps {
  photo: {
    id: string;
    imageUrl: string;
    caption: string;
    likes: number;
    date: string;
  };
  index: number;
}

const InstagramPost: React.FC<InstagramPostProps> = ({ photo, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { imageUrl, imageError } = useFallbackImage(photo.imageUrl, photo.caption);
  
  return (
    <div 
      className="instagram-post aspect-square relative rounded-lg overflow-hidden reveal-on-scroll cursor-pointer"
      style={{ animationDelay: `${0.1 * index}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageUrl} 
        alt={photo.caption}
        className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        loading="lazy"
      />
      
      {/* Overlay on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-white text-xs md:text-sm line-clamp-2">{photo.caption}</p>
        <div className="flex items-center mt-2 text-xs text-white/80">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="ml-1">{photo.likes}</span>
          </span>
        </div>
      </div>
      
      {/* Adinkra corner decoration */}
      <div className="absolute top-2 right-2 opacity-70">
        <AdinkraSymbol symbol="random" size={16} color="#FFD700" />
      </div>
    </div>
  );
};

export default InstagramFeed;
