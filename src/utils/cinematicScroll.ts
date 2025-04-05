
// Utility to add cinematic scroll animations to the website

// Function to initialize all scroll-triggered animations
export const initCinematicScroll = () => {
  // Add reveal animation to elements with 'reveal-on-scroll' class
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  // Observer callback function
  const revealCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Uncomment to make elements hide again when scrolled out of view
        // entry.target.classList.remove('visible');
      }
    });
  };
  
  // Create the observer with options
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // viewport
    threshold: 0.1, // 10% of element must be visible
    rootMargin: '0px 0px -50px 0px' // triggers slightly before element enters viewport
  });
  
  // Observe all elements with the reveal class
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (!targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    });
  });
  
  // Add parallax effect to elements with 'parallax-bg' class
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    const scrollY = window.scrollY;
    
    parallaxElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      const speed = el.dataset.speed || '0.5';
      const yPos = scrollY * parseFloat(speed);
      
      el.style.backgroundPosition = `center ${yPos}px`;
    });
  });
};

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initCinematicScroll);
  
  // Re-initialize on route changes for single-page applications
  window.addEventListener('popstate', initCinematicScroll);
}
