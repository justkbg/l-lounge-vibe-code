import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import { toast } from '@/components/ui/use-toast';
import GalleryGrid, { GalleryImage } from '@/components/gallery/GalleryGrid'; 
import ImageModal from '@/components/gallery/ImageModal';
import FilterButtons from '@/components/gallery/FilterButtons';
import InstagramFeed from '@/components/InstagramFeed';
import AboutLounge from '@/components/AboutLounge';
import GalleryPageHeader from '@/components/gallery/GalleryPageHeader';
import GalleryAboutSection from '@/components/gallery/GalleryAboutSection';
import GallerySocialSection from '@/components/gallery/GallerySocialSection';

// Gallery categories
const categories = [
  { id: "all", name: "All" },
  { id: "interior", name: "Interior" },
  { id: "food", name: "Food" },
  { id: "drinks", name: "Drinks" },
  { id: "events", name: "Events" }
];

// Updated image paths with more reliable URLs
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
    image: "https://images.unsplash.com/photo-1582037928769-181cf6ea3d9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
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

const Gallery = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Add cinematic scroll appearance for gallery items
  useEffect(() => {
    const elements = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [filter]); // Re-run when filter changes

  // Modal handlers
  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Preload images
  useEffect(() => {
    // Preload all images with improved error handling
    let loadedCount = 0;
    
    galleryImages.forEach((image) => {
      const img = new Image();
      img.src = image.image;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        if (loadedCount === galleryImages.length) {
          toast({
            title: "Gallery loaded",
            description: "All images have been successfully loaded.",
          });
        }
      };
      
      img.onerror = () => {
        console.log(`Failed to load image: ${image.image}, using fallback`);
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
    });
    
    // Fallback timer in case images take too long
    const timer = setTimeout(() => {
      if (imagesLoaded < galleryImages.length) {
        toast({
          title: "Gallery ready",
          description: "You can now explore our gallery.",
        });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced cinematic animation classes
  const pageEnterClasses = "animate-fade-in transition-all duration-700";

  return (
    <>
      <Navbar />
      <main className={`pt-24 pb-20 relative ${pageEnterClasses}`} ref={galleryRef}>
        {/* Add Adinkra background with enhanced animation */}
        <AdinkraBackground 
          symbol="random" 
          density={0.2} 
          opacity={0.15} 
          animated={true} 
          cinematicEffect="float"
        />
        
        <div className="container-custom">
          <GalleryPageHeader />

          <FilterButtons 
            categories={categories} 
            activeFilter={filter} 
            onFilterChange={setFilter}
          />

          <GalleryGrid 
            images={galleryImages} 
            filter={filter} 
            onImageClick={openModal}
          />
          
          <GalleryAboutSection />
          
          <GallerySocialSection />
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
