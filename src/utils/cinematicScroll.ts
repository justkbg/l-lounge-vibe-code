
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
        
        // Add an extra class for cinematic entrance based on position
        const rect = entry.target.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        // Bottom entrance
        if (rect.top > windowHeight * 0.7) {
          entry.target.classList.add('from-bottom');
        } 
        // Side entrance
        else if (rect.left < windowWidth * 0.3) {
          entry.target.classList.add('from-left');
        } else if (rect.right > windowWidth * 0.7) {
          entry.target.classList.add('from-right');
        }
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
      
      // Enhanced smooth scroll with easing
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = elementPosition - startPosition;
      const duration = 1000; // ms
      let startTime: number | null = null;
      
      // Easing function
      const easeInOutCubic = (t: number) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easing = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easing);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
    });
  });
  
  // Enhanced parallax effect
  const parallaxElements = document.querySelectorAll('.parallax-bg, .parallax-element');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      const speed = el.dataset.speed || '0.5';
      const direction = el.dataset.direction || 'vertical';
      
      if (direction === 'vertical') {
        const yPos = scrollY * parseFloat(speed);
        el.style.transform = `translateY(${yPos}px)`;
      } else if (direction === 'horizontal') {
        const xPos = scrollY * parseFloat(speed);
        el.style.transform = `translateX(${xPos}px)`;
      } else if (direction === 'rotate') {
        const rotation = scrollY * parseFloat(speed) * 0.05;
        el.style.transform = `rotate(${rotation}deg)`;
      } else if (direction === 'scale') {
        const baseScale = 1;
        const scaleChange = scrollY * parseFloat(speed) * 0.001;
        const newScale = baseScale + scaleChange;
        el.style.transform = `scale(${newScale})`;
      }
    });
    
    // Add subtle rotation to adinkra symbols based on scroll
    const adinkraElements = document.querySelectorAll('.adinkra-bg::before');
    adinkraElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      const rotation = scrollY * 0.03;
      el.style.transform = `rotate(${rotation}deg)`;
    });
  });
  
  // Add cursor trail effect
  let trailElements: HTMLElement[] = [];
  const maxTrails = 5;
  
  for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = `${1 - (i * 0.2)}`;
    trail.style.width = `${10 - (i * 1.5)}px`;
    trail.style.height = `${10 - (i * 1.5)}px`;
    document.body.appendChild(trail);
    trailElements.push(trail);
  }
  
  document.addEventListener('mousemove', (e) => {
    // Update the position of all trail elements with delay
    setTimeout(() => {
      trailElements.forEach((trail, index) => {
        trail.style.opacity = '0.7';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        
        // Hide trail after a delay
        setTimeout(() => {
          trail.style.opacity = '0';
        }, 100 * index);
      });
    }, 50); // slight delay for trailing effect
  });
};

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initCinematicScroll);
  
  // Re-initialize on route changes for single-page applications
  window.addEventListener('popstate', initCinematicScroll);
}
