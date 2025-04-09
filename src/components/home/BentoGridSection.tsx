
import React from 'react';
import BentoCard from '@/components/BentoCard';
import { motion } from 'framer-motion';

const BentoGridSection: React.FC = () => {
  const offeringsData = [
    {
      title: "Signature Cocktails",
      description: "Our masterfully crafted cocktails blend premium spirits with local Ghanaian ingredients for a unique taste experience.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80",
      link: "/menu",
      size: "lg" as const
    },
    {
      title: "Premium Dining",
      description: "Experience our fusion cuisine that combines local Ghanaian flavors with international culinary techniques.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80",
      link: "/menu",
      size: "md" as const
    },
    {
      title: "VIP Lounge",
      description: "Exclusive spaces designed for privacy and premium service for special occasions and distinguished guests.",
      image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
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
    <section className="py-20 bg-[#0B0B0F] adinkra-bg marcello-x-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="sankofa-symbol mb-4"></div>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore L-Lounge
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our premium offerings and experiences
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(350px,auto)]">
          {offeringsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={index === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
            >
              <BentoCard
                title={item.title}
                description={item.description}
                image={item.image}
                link={item.link}
                size={item.size}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="marcello-divider mx-auto"></div>
          <p className="text-muted-foreground mt-8 font-playfair italic">
            "Akwaaba" — Welcome to an authentic Ghanaian luxury experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default BentoGridSection;
