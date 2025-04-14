
// Gallery data with different categories

export type GalleryImage = {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  featured?: boolean;
};

// High-quality gallery images for L-Lounge
export const galleryImages: GalleryImage[] = [
  // Interior shots
  {
    id: 1,
    title: "L-Lounge Main Bar",
    category: "interior",
    image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80",
    featured: true
  },
  {
    id: 2,
    title: "VIP Seating Area",
    category: "interior",
    image: "https://images.unsplash.com/photo-1544085701-4d54e9f41c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
  },
  {
    id: 3,
    title: "Outdoor Patio",
    category: "interior",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1746&q=80"
  },
  {
    id: 4,
    title: "Private Dining Area",
    category: "interior",
    image: "https://images.unsplash.com/photo-1523529364348-e930dcb39642?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 5,
    title: "Ambient Night Lighting",
    category: "interior",
    image: "https://images.unsplash.com/photo-1590332339349-902d8f9c38d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    featured: true
  },
  
  // Food images
  {
    id: 6,
    title: "Signature Grill Platter",
    category: "food",
    image: "https://images.unsplash.com/photo-1594041680539-fc598d3784ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80",
    featured: true
  },
  {
    id: 7,
    title: "Local Delicacies",
    category: "food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80"
  },
  {
    id: 8,
    title: "Chef's Special",
    category: "food",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
  },
  {
    id: 9,
    title: "Gourmet Burger",
    category: "food",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 10,
    title: "Dessert Selection",
    category: "food",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1827&q=80"
  },
  
  // Drinks imagery
  {
    id: 11,
    title: "Signature Cocktail",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1560178783-26a8a8d67444?ixlib=rb-4.0.3&auto=format&fit=crop&w=1759&q=80",
    featured: true
  },
  {
    id: 12,
    title: "Premium Spirits",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1613126722376-2acce4b1ec93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 13,
    title: "Tropical Concoction",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1564414872027-3ed99f0a27b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1735&q=80"
  },
  {
    id: 14,
    title: "Wine Selection",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1553361371-9513cbd8a8a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80"
  },
  {
    id: 15,
    title: "Craft Beer",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  
  // Events
  {
    id: 16,
    title: "Weekend DJ Night",
    category: "events",
    image: "https://images.unsplash.com/photo-1571151329794-62e7f5477457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    featured: true
  },
  {
    id: 17,
    title: "Live Band Performance",
    category: "events",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 18,
    title: "Exclusive VIP Event",
    category: "events",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80"
  },
  {
    id: 19,
    title: "Corporate Event",
    category: "events",
    image: "https://images.unsplash.com/photo-1556125574-d7f27ec36a82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 20,
    title: "Mix & Mingle Night",
    category: "events",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  
  // Add more Ghanaian-themed images
  {
    id: 21,
    title: "Traditional Drummers",
    category: "events",
    image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1672&q=80"
  },
  {
    id: 22,
    title: "Kente-inspired Decor",
    category: "interior",
    image: "https://images.unsplash.com/photo-1543310610-58d79e523ab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1690&q=80"
  },
  {
    id: 23,
    title: "African Fusion Cuisine",
    category: "food",
    image: "https://images.unsplash.com/photo-1519666150144-4f130b8f8c05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1778&q=80"
  },
  {
    id: 24,
    title: "Urban Nightlife",
    category: "events",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1830&q=80"
  }
];

// Get featured images for special displays
export const getFeaturedImages = (): GalleryImage[] => {
  return galleryImages.filter(image => image.featured);
};

// Get images by category
export const getImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'all') return galleryImages;
  return galleryImages.filter(image => image.category === category);
};
