
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import MarcelloUI from "./pages/MarcelloUI";
import Order from "./pages/Order";
import { initCinematicScroll } from "./utils/cinematicScroll";
import "./App.css";
import "./styles/adinkra-variables.css";

// Enhanced animation on route changes with improved scrolling
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Improved smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Add cinematic page transition effect
    document.body.classList.add('page-transition');
    
    // Run cinematic scroll initialization after route change
    setTimeout(() => {
      initCinematicScroll();
      
      // Add page transition class to main content
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('fade-in-up');
        
        // Add staggered animation to sections
        const sections = mainContent.querySelectorAll('section');
        sections.forEach((section, index) => {
          section.style.animationDelay = `${0.1 * (index + 1)}s`;
          section.classList.add('animate-fade-in');
        });
      }
      
      // Ensure all pages have adinkra background
      document.querySelectorAll('main, section').forEach(element => {
        if (!element.classList.contains('adinkra-bg')) {
          element.classList.add('adinkra-bg');
        }
      });
      
      document.body.classList.remove('page-transition');
    }, 100);
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/marcello-ui" element={<MarcelloUI />} />
          <Route path="/order" element={<Order />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
