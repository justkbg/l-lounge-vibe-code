
import { OrderItem } from '@/types/order';

// Sample menu items for ordering
export const menuItems: Omit<OrderItem, 'quantity'>[] = [
  {
    id: 1,
    name: "Signature Gold Coast Sunset Cocktail",
    description: "Our signature cocktail with premium gin, passion fruit, and gold flakes",
    price: 12.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Jollof Risotto with Grilled Chicken",
    description: "Fusion of Italian risotto with Ghanaian jollof spices and tender grilled chicken",
    price: 18.99,
    category: "mains",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1370&q=80"
  },
  {
    id: 3,
    name: "Kente Martini",
    description: "A colorful martini inspired by the patterns of Kente cloth",
    price: 10.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    name: "Grilled Sea Bass",
    description: "Fresh sea bass grilled to perfection with herbs and spices",
    price: 24.99,
    category: "mains",
    image: "https://images.unsplash.com/photo-1619895091624-4b0732d6b887?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 5,
    name: "Chocolate Fondant",
    description: "Decadent chocolate fondant with a molten center",
    price: 9.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1812&q=80"
  },
  {
    id: 6,
    name: "Accra Mule Cocktail",
    description: "Our twist on the Moscow Mule with African ginger and lime",
    price: 11.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581927692308-be9e43b4d860?ixlib=rb-4.0.3&auto=format&fit=crop&w=1373&q=80"
  }
];
