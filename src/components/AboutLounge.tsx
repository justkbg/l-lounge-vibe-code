
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AdinkraSymbol from './AdinkraSymbol';

const AboutLounge: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <AdinkraSymbol symbol="nyameNti" size={24} color="#FFD700" />
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold text-primary mb-2">About L-Lounge</h3>
                <p className="text-muted-foreground">
                  L-Lounge is a premier bar and grill located in Sakumono, Ghana, known for its serene environment and quality service. 
                  Our establishment offers a diverse selection of grilled meats, continental dishes, and buffet services suitable for events and takeaways.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <AdinkraSymbol symbol="adinkrahene" size={24} color="#FFD700" />
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold text-primary mb-2">Our Ambiance</h3>
                <p className="text-muted-foreground">
                  The lounge provides a calm and cozy space, making it ideal for family gatherings, friendly meet-ups, and business discussions.
                  Patrons have praised our serene environment and tasty food offerings, creating the perfect setting for memorable experiences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <AdinkraSymbol symbol="dwennimmen" size={24} color="#FFD700" />
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold text-primary mb-2">Customer Feedback</h3>
                <p className="text-muted-foreground">
                  While the overall experience is positive, some customers have noted service delays during peak hours 
                  and suggested the addition of outdoor fans to enhance comfort. We continuously strive to improve our services 
                  based on customer feedback.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="glass-card overflow-hidden h-full">
          <CardContent className="p-0 h-full">
            <div className="relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
                alt="L-Lounge Interior" 
                className="w-full h-full object-cover"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-playfair font-bold text-white gold-shimmer mb-2">Experience L-Lounge</h3>
                <div className="flex flex-col gap-4">
                  <FeatureItem icon="🍽️" text="Premium Dining Experience" />
                  <FeatureItem icon="🥂" text="Signature Cocktails & Drinks" />
                  <FeatureItem icon="🎵" text="Live Music & Entertainment" />
                  <FeatureItem icon="🎉" text="Event Hosting & Private Parties" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface FeatureItemProps {
  icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="text-white">{text}</span>
    </div>
  );
};

export default AboutLounge;
