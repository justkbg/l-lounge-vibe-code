
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import MarcelloUI from "./pages/MarcelloUI";
import Order from "./pages/Order";
import LoadingScreen from "./components/LoadingScreen";
import { initCinematicScroll } from "./utils/cinematicScroll";
import { preloadCriticalImages } from "./utils/imageLoader";
import "./App.css";
import "./styles/adinkra-variables.css";

// Enhanced animation on route changes with improved scrolling
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Reset scroll position immediately without animation
    window.scrollTo(0, 0);
    
    // Reset any ongoing animations
    const animatingElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in');
    animatingElements.forEach(el => {
      // Force reflow with a safer approach that checks element type - fixed TypeScript error
      if (el instanceof HTMLElement) {
        el.classList.remove('animate-fade-in', 'animate-scale-in');
        void el.offsetHeight; // Trigger reflow
        el.classList.add('animate-fade-in'); 
      }
    });
    
    // Add cinematic transition effect
    document.body.classList.add('page-transition');
    
    // Initialize cinematic scroll effects after a short delay
    setTimeout(() => {
      initCinematicScroll();
      
      // Add page transition class to main content with proper timing
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('fade-in-up');
        
        // Add staggered animation to sections with controlled timing
        const sections = mainContent.querySelectorAll('section');
        sections.forEach((section, index) => {
          // Stagger the animations with a small delay between each
          setTimeout(() => {
            if (section instanceof HTMLElement) {
              section.classList.add('animate-fade-in');
            }
          }, 100 * (index + 1));
        });
      }
      
      // Remove transition class
      document.body.classList.remove('page-transition');
    }, 50); // Reduced delay for faster response
    
  }, [location]);
  
  return null;
};

// List of critical images to preload for better performance
const criticalImages = [
  "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
  "https://images.unsplash.com/photo-1544637378-a0ddf15e73c0?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1740&auto=format&fit=crop"
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  useEffect(() => {
    // Check if this is the first load of the site
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
      // First time visitor - show loading screen
      localStorage.setItem('hasVisitedBefore', 'true');
      
      // Preload critical images in background
      preloadCriticalImages(criticalImages).then(() => {
        console.log('Critical images preloaded successfully');
      });
      
      // Set timeout to hide loading screen after a reasonable time
      setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
      }, 3000); // 3 seconds for first-time visitors
    } else {
      // Returning visitor - hide loading screen faster
      setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
      }, 500);
    }
    
    // Optimize scroll behavior
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Add GPU acceleration for smoother animations
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.perspective = '1000px';
  }, []);
  
  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // Enable smooth scrolling after initial load
    setTimeout(() => {
      document.documentElement.classList.add('smooth-scroll');
    }, 500);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {isFirstLoad && <LoadingScreen onLoadComplete={handleLoadComplete} />}
        
        <BrowserRouter>
          <ScrollToTop />
          {!isLoading && (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/marcello-ui" element={<MarcelloUI />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
