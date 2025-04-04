
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
}

const menuData = {
  drinks: [
    {
      id: 1,
      name: "Gold Coast Sunset",
      description: "L-Lounge signature cocktail with premium rum, coconut, pineapple, and a touch of local akpeteshie.",
      price: "GH₵ 65",
      image: "https://images.unsplash.com/photo-1638990742994-c96e4f7617fe?q=80&w=1000&auto=format&fit=crop",
      tags: ["Signature", "Sweet"]
    },
    {
      id: 2,
      name: "Accra Mule",
      description: "A Ghanaian twist on the classic Moscow Mule with ginger beer, lime, and premium vodka.",
      price: "GH₵ 60",
      image: "https://images.unsplash.com/photo-1547595468-fdb5de8a07d6?q=80&w=1000&auto=format&fit=crop",
      tags: ["Refreshing", "Signature"]
    },
    {
      id: 3,
      name: "Kente Martini",
      description: "A sophisticated blend of gin, vermouth, and a dash of hibiscus syrup.",
      price: "GH₵ 70",
      image: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1000&auto=format&fit=crop",
      tags: ["Premium", "Strong"]
    },
    {
      id: 4,
      name: "Osu Night",
      description: "Aged whiskey, bitters, and a hint of cocoa, perfect for a sophisticated evening.",
      price: "GH₵ 75",
      image: "https://images.unsplash.com/photo-1486947799489-3fabdd7d32a6?q=80&w=1000&auto=format&fit=crop",
      tags: ["Premium", "Strong"]
    }
  ],
  starters: [
    {
      id: 1,
      name: "Kelewele Shrimp",
      description: "Spicy fried plantains served with marinated grilled shrimp and a zesty avocado dip.",
      price: "GH₵ 85",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
      tags: ["Spicy", "Local Fusion"]
    },
    {
      id: 2,
      name: "Suya Sliders",
      description: "Mini beef burgers seasoned with suya spice, served with yam chips.",
      price: "GH₵ 90",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1000&auto=format&fit=crop",
      tags: ["Spicy", "Savory"]
    },
    {
      id: 3,
      name: "Palm Nut Croquettes",
      description: "Crispy golden croquettes with palm nut filling, served with a herb aioli.",
      price: "GH₵ 80",
      image: "https://images.unsplash.com/photo-1576488489579-6967c02c56fc?q=80&w=1000&auto=format&fit=crop",
      tags: ["Vegetarian", "Local Fusion"]
    }
  ],
  mains: [
    {
      id: 1,
      name: "Jollof Risotto",
      description: "Italian risotto technique meets Ghanaian jollof flavors, served with grilled chicken.",
      price: "GH₵ 160",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
      tags: ["Signature", "Fusion"]
    },
    {
      id: 2,
      name: "Grilled Sea Bass",
      description: "Fresh sea bass with a palm wine reduction, served with attieke and grilled vegetables.",
      price: "GH₵ 190",
      image: "https://images.unsplash.com/photo-1535400255456-1219d5f7c208?q=80&w=1000&auto=format&fit=crop",
      tags: ["Seafood", "Premium"]
    },
    {
      id: 3,
      name: "Braised Oxtail",
      description: "Slow-cooked oxtail in a rich red wine sauce, served with creamy yam mash.",
      price: "GH₵ 180",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
      tags: ["Savory", "Premium"]
    },
    {
      id: 4,
      name: "Vegetable Kontomire",
      description: "Modern take on traditional kontomire stew with seasonal vegetables and palm oil drizzle.",
      price: "GH₵ 140",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1000&auto=format&fit=crop",
      tags: ["Vegetarian", "Local"]
    }
  ],
  desserts: [
    {
      id: 1,
      name: "Coconut Panna Cotta",
      description: "Silky coconut panna cotta with a tropical fruit compote and toasted coconut flakes.",
      price: "GH₵ 60",
      image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1000&auto=format&fit=crop",
      tags: ["Sweet", "Creamy"]
    },
    {
      id: 2,
      name: "Gold Coast Chocolate Fondant",
      description: "Warm chocolate cake made with Ghana's finest chocolate, served with vanilla ice cream.",
      price: "GH₵ 65",
      image: "https://images.unsplash.com/photo-1542124937-4027ade70c2d?q=80&w=1000&auto=format&fit=crop",
      tags: ["Hot", "Rich"]
    },
    {
      id: 3,
      name: "Sobolo Sorbet",
      description: "Refreshing hibiscus sorbet with a hint of ginger and mint.",
      price: "GH₵ 55",
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1000&auto=format&fit=crop",
      tags: ["Cold", "Refreshing"]
    }
  ]
};

const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <Card className="overflow-hidden border-border hover:border-primary transition-colors duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
            {item.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-xs font-medium bg-lounge-gold/80 text-black px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-playfair font-bold text-primary">{item.name}</h3>
          <span className="font-medium text-primary">{item.price}</span>
        </div>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </CardContent>
    </Card>
  );
};

const MenuSection: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState("drinks");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="section-title animate-fade-in">Our Menu</h1>
            <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A fusion of traditional Ghanaian flavors with international culinary techniques
            </p>
          </div>

          <Tabs defaultValue="drinks" onValueChange={setActiveTab} className="w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-center mb-12">
              <TabsList className="glass-effect">
                <TabsTrigger value="drinks">Signature Drinks</TabsTrigger>
                <TabsTrigger value="starters">Starters</TabsTrigger>
                <TabsTrigger value="mains">Main Courses</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="drinks" className="animate-fade-in">
              <MenuSection items={menuData.drinks} />
            </TabsContent>

            <TabsContent value="starters" className="animate-fade-in">
              <MenuSection items={menuData.starters} />
            </TabsContent>

            <TabsContent value="mains" className="animate-fade-in">
              <MenuSection items={menuData.mains} />
            </TabsContent>

            <TabsContent value="desserts" className="animate-fade-in">
              <MenuSection items={menuData.desserts} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Menu;
