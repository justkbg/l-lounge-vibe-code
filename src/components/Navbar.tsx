
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-primary font-playfair text-2xl md:text-3xl font-bold">L-Lounge</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/menu" className="navbar-link">Menu</Link>
          <Link to="/events" className="navbar-link">Events</Link>
          <Link to="/gallery" className="navbar-link">Gallery</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <Button asChild>
            <Link to="/reservations">Book a Table</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="glass-effect md:hidden py-6 animate-fade-in">
          <nav className="container-custom flex flex-col items-center gap-6">
            <Link to="/" className="navbar-link" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/menu" className="navbar-link" onClick={toggleMobileMenu}>Menu</Link>
            <Link to="/events" className="navbar-link" onClick={toggleMobileMenu}>Events</Link>
            <Link to="/gallery" className="navbar-link" onClick={toggleMobileMenu}>Gallery</Link>
            <Link to="/contact" className="navbar-link" onClick={toggleMobileMenu}>Contact</Link>
            <Button asChild>
              <Link to="/reservations" onClick={toggleMobileMenu}>Book a Table</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
