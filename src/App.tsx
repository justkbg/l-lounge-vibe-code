
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
import { initCinematicScroll } from "./utils/cinematicScroll";
import "./App.css";
import "./styles/adinkra-variables.css";

// Enhanced animation on route changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Smooth scroll to top with easing
    const scrollToTop = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
      }
    };
    
    scrollToTop();
    
    // Run cinematic scroll initialization after route change
    setTimeout(() => {
      initCinematicScroll();
      
      // Add page transition class to main content
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('fade-in-up');
      }
      
      // Add animated class to all adinkra symbols
      document.querySelectorAll('.adinkra-symbol').forEach(symbol => {
        symbol.classList.add('animate-fade-in');
      });
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
