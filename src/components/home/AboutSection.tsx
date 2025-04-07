
import React from 'react';
import { Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection: React.FC = () => {
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
            
            <div className="talking-drum mt-8"></div>
          </div>
          
          <div className="relative h-[400px] rounded-2xl overflow-hidden animate-fade-in glass-card" style={{ animationDelay: '0.4s' }}>
            <img 
              src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
              alt="L-Lounge Interior" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <div className="absolute inset-0 adinkra-pattern opacity-5"></div>
          </div>
        </div>
        
        <div className="kente-divider my-16"></div>
        
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-4">
            Experience the Rhythm of Ghana
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our venues feature live performances showcasing the best of Ghanaian music, from traditional drums to contemporary Afrobeats.
          </p>
          
          <Card className="bg-transparent border-none mx-auto max-w-xs">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-4 bg-[#1F1F2A]/50 glass-card p-4">
                <Music className="text-primary" size={36} />
                <div className="text-left">
                  <p className="text-white font-medium">Live Music</p>
                  <p className="text-sm text-muted-foreground">Every Friday & Saturday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
