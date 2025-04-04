
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-primary mb-4 animate-fade-in">404</h1>
          <p className="text-2xl md:text-3xl font-playfair text-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Page Not Found
          </p>
          <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            We apologize, but the page you are looking for doesn't exist. You might have mistyped the address or the page may have moved.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
