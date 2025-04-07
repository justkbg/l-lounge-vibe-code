
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden adinkra-bg">
      {/* Hero background - Using a more reliable image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80" 
          alt="L-Lounge Atmosphere" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/70 to-transparent"></div>
        
        {/* Adinkra symbol overlay */}
        <div className="absolute inset-0 adinkra-pattern opacity-10"></div>
      </div>
      
      <div className="container-custom relative z-10 h-full flex flex-col justify-center items-center text-center">
        <div className="sankofa-symbol mb-4"></div>
        
        <h1 className={`text-5xl md:text-7xl font-playfair font-bold mb-4 ${typingComplete ? 'text-primary gold-shimmer' : 'kinetic-text text-primary'}`} style={{ animationDelay: '0.2s' }}>
          L-Lounge
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Experience Ghana's most sophisticated lounge and restaurant, offering premium cocktails and a fusion of local and international cuisines.
        </p>
        
        <div className="soundwave mb-8">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        
        <Button size="lg" className="animate-fade-in neo-glow hover-float" style={{ animationDelay: '0.6s', background: 'linear-gradient(90deg, #FFD700, #FF9900)' }} asChild>
          <Link to="/reservations">Book a Table</Link>
        </Button>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-primary" size={24} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
