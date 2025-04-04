
import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: "upcoming" | "past";
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Jazz Night with The Accra Quartet",
    date: "April 10, 2025",
    time: "8:00 PM - 11:00 PM",
    location: "Main Lounge",
    description: "Experience an unforgettable night of smooth jazz with The Accra Quartet, one of Ghana's premier jazz ensembles. Enjoy signature cocktails while listening to classic and contemporary jazz interpretations.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    category: "upcoming"
  },
  {
    id: 2,
    title: "Wine Tasting: Tour of Africa",
    date: "April 17, 2025",
    time: "6:30 PM - 9:00 PM",
    location: "Private Dining Room",
    description: "Join our sommelier for an exclusive wine tasting featuring the finest selections from South Africa, Morocco, and emerging Ghanaian wineries. Paired with complementary hors d'oeuvres.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "upcoming"
  },
  {
    id: 3,
    title: "Afrobeats Party with DJ Spinall",
    date: "April 24, 2025",
    time: "10:00 PM - 3:00 AM",
    location: "Main Lounge & Terrace",
    description: "Dance the night away with internationally acclaimed DJ Spinall, spinning the hottest Afrobeats tracks. VIP tables available with bottle service.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "upcoming"
  },
  {
    id: 4,
    title: "New Year's Eve Celebration",
    date: "December 31, 2024",
    time: "8:00 PM - 4:00 AM",
    location: "Entire Venue",
    description: "Our glamorous New Year's Eve gala featured a 5-course dinner, premium open bar, live band, and countdown with champagne toast. The event was sold out weeks in advance.",
    image: "https://images.unsplash.com/photo-1521478706270-f2e33c203d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "past"
  },
  {
    id: 5,
    title: "Valentine's Day Special",
    date: "February 14, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Private Dining Room",
    description: "Couples enjoyed our exclusive Valentine's Day menu featuring aphrodisiac-inspired dishes, paired wines, and live acoustic music for a romantic atmosphere.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1425&q=80",
    category: "past"
  },
  {
    id: 6,
    title: "Cocktail Masterclass",
    date: "March 15, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "Bar Area",
    description: "Our head mixologist led an interactive class teaching participants how to craft L-Lounge's signature cocktails using premium spirits and local ingredients.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80",
    category: "past"
  }
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`h-[500px] perspective-1000 cursor-pointer animate-fade-in ${flipped ? 'z-10' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative h-full w-full transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute h-full w-full backface-hidden">
          <div className="h-full rounded-xl overflow-hidden border border-border group">
            <div className="relative h-2/3">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.category === 'upcoming' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {event.category === 'upcoming' ? 'Upcoming' : 'Past Event'}
                </span>
              </div>
            </div>
            <div className="p-6 h-1/3 flex flex-col justify-between">
              <h3 className="text-xl font-playfair font-bold text-primary line-clamp-2">{event.title}</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute h-full w-full backface-hidden rotate-y-180">
          <div className="h-full rounded-xl overflow-hidden border border-primary p-6 bg-card flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-playfair font-bold text-primary mb-4">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{event.location}</span>
                </div>
              </div>
              {event.category === 'upcoming' && (
                <Button className="w-full">RSVP Now</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="section-title animate-fade-in">Events at L-Lounge</h1>
            <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              From live performances to exclusive tastings, explore our curated events
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-center mb-12">
              <TabsList className="glass-effect">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData
                  .filter(event => event.category === 'upcoming')
                  .map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData
                  .filter(event => event.category === 'past')
                  .map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Events;
