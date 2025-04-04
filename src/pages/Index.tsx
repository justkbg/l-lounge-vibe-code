
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BentoCard from '@/components/BentoCard';

const HeroSection = () => {
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
          src="https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80" 
          alt="L-Lounge Atmosphere" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1519214605650-76a613ee3245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80";
          }}
        />
        <div className="hero-overlay bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/70 to-transparent"></div>
      </div>
      
      <div className="container-custom relative z-10 h-full flex flex-col justify-center items-center text-center">
        <h1 className={`text-5xl md:text-7xl font-playfair font-bold mb-4 ${typingComplete ? 'text-primary' : 'kinetic-text text-primary'}`} style={{ animationDelay: '0.2s' }}>
          L-Lounge
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Experience Ghana's most sophisticated lounge and restaurant, offering premium cocktails and a fusion of local and international cuisines.
        </p>
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

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B0B0F] to-[#1F1F2A]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Welcome to L-Lounge</h2>
          <p className="section-subtitle">
            Where luxury meets cultural richness in the heart of Ghana
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in glass-card p-8" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-4 kente-border">Our Story</h3>
            <p className="text-muted-foreground mb-4">
              Founded in 2018, L-Lounge has redefined the hospitality experience in Ghana by creating a space that celebrates both local culture and international luxury standards.
            </p>
            <p className="text-muted-foreground mb-4">
              Our vision combines the rich traditions of Ghanaian hospitality with contemporary design and world-class service, creating a unique venue for both locals and visitors.
            </p>
            <p className="text-muted-foreground">
              Every detail at L-Lounge is thoughtfully crafted to deliver an unforgettable experience, from our carefully curated menu to our sophisticated ambiance.
            </p>
          </div>
          
          <div className="relative h-[400px] rounded-2xl overflow-hidden animate-fade-in glass-card" style={{ animationDelay: '0.4s' }}>
            <img 
              src="https://images.unsplash.com/photo-1517254797898-04edd251744f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
              alt="L-Lounge Interior" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1525268323556-0505312a9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoGridSection = () => {
  const offeringsData = [
    {
      title: "Signature Cocktails",
      description: "Our masterfully crafted cocktails blend premium spirits with local Ghanaian ingredients for a unique taste experience.",
      image: "https://images.unsplash.com/photo-1640904422940-7a83f9a78bfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80",
      link: "/menu",
      size: "lg" as const
    },
    {
      title: "Premium Dining",
      description: "Experience our fusion cuisine that combines local Ghanaian flavors with international culinary techniques.",
      image: "https://images.unsplash.com/photo-1501178288296-c8651922df3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80",
      link: "/menu",
      size: "md" as const
    },
    {
      title: "VIP Lounge",
      description: "Exclusive spaces designed for privacy and premium service for special occasions and distinguished guests.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
      link: "/reservations",
      size: "md" as const
    },
    {
      title: "Live Entertainment",
      description: "Regular performances featuring Ghana's top musicians and DJs creating the perfect atmosphere.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "/events",
      size: "md" as const
    }
  ];

  return (
    <section className="py-20 bg-[#0B0B0F] adinkra-bg">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Explore L-Lounge</h2>
          <p className="section-subtitle">
            Discover our premium offerings and experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          {offeringsData.map((item, index) => (
            <BentoCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              link={item.link}
              size={item.size}
              className="animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BentoGridSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
