
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Signature Gold Coast Sunset Cocktail",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "VIP Lounge Area",
    category: "interior",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 3,
    title: "Weekend DJ Performance",
    category: "events",
    image: "https://images.unsplash.com/photo-1571266028243-a675886a191c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Jollof Risotto with Grilled Chicken",
    category: "food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1370&q=80"
  },
  {
    id: 5,
    title: "Bar Counter",
    category: "interior",
    image: "https://images.unsplash.com/photo-1525268323556-0505312a9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 6,
    title: "Live Band Performance",
    category: "events",
    image: "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 7,
    title: "Grilled Sea Bass",
    category: "food",
    image: "https://images.unsplash.com/photo-1619895091624-4b0732d6b887?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 8,
    title: "Outdoor Terrace",
    category: "interior",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 9,
    title: "Kente Martini",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 10,
    title: "Chocolate Fondant",
    category: "food",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1812&q=80"
  },
  {
    id: 11,
    title: "Private Dining Area",
    category: "interior",
    image: "https://images.unsplash.com/photo-1544931770-3f0a3e93eabc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1526&q=80"
  },
  {
    id: 12,
    title: "Accra Mule Cocktail",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581927692308-be9e43b4d860?ixlib=rb-4.0.3&auto=format&fit=crop&w=1373&q=80"
  }
];

interface ImageModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative">
          <img 
            src={image.image} 
            alt={image.title} 
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-playfair font-bold text-primary">{image.title}</h3>
            <p className="text-white opacity-80 text-sm mt-1">Category: {image.category}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const categories = [
    { id: "all", name: "All" },
    { id: "interior", name: "Interior" },
    { id: "food", name: "Food" },
    { id: "drinks", name: "Drinks" },
    { id: "events", name: "Events" }
  ];

  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="section-title animate-fade-in">Our Gallery</h1>
            <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore the ambiance, culinary delights, and memorable moments at L-Lounge
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="aspect-square rounded-xl overflow-hidden cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${0.1 * (index % 6)}s` }}
                onClick={() => openModal(image)}
              >
                <div className="relative h-full">
                  <img 
                    src={image.image} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-playfair font-bold text-primary">{image.title}</h3>
                    <p className="text-white text-sm mt-1">Click to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ImageModal 
        image={selectedImage} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default Gallery;
