
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
        
        // Trigger any staggered animations within the revealed element
        const staggeredElements = entry.target.querySelectorAll('.staggered-fade');
        staggeredElements.forEach(el => {
          el.classList.add('animate');
        });
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
  
  // Add smooth scrolling to all anchor links with enhanced physics
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
      const duration = 1200; // ms - more cinematic
      let startTime: number | null = null;
      
      // Improved easing function for more cinematic feel
      const easeOutQuart = (t: number) => {
        return 1 - Math.pow(1 - t, 4);
      };

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easing = easeOutQuart(progress);
        
        window.scrollTo(0, startPosition + distance * easing);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Add focus class to target for emphasis
          targetElement.classList.add('focus-highlight');
          setTimeout(() => {
            targetElement.classList.remove('focus-highlight');
          }, 800);
        }
      }
      
      requestAnimationFrame(animation);
    });
  });
  
  // Enhanced parallax effect with more immersive depth
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      const speed = el.dataset.speed || '0.3';
      const direction = el.dataset.direction || 'vertical';
      const scale = el.dataset.scale || '1';
      const rotation = el.dataset.rotation || '0';
      
      // Calculate the visual effect
      if (direction === 'vertical') {
        const yPos = scrollY * parseFloat(speed);
        el.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${rotation}deg)`;
      } else if (direction === 'horizontal') {
        const xPos = scrollY * parseFloat(speed);
        el.style.transform = `translateX(${xPos}px) scale(${scale}) rotate(${rotation}deg)`;
      } else if (direction === 'rotate') {
        const rotation = scrollY * parseFloat(speed) * 0.05;
        el.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      } else if (direction === 'scale') {
        const baseScale = parseFloat(scale);
        const scaleChange = scrollY * parseFloat(speed) * 0.001;
        const newScale = baseScale + scaleChange;
        el.style.transform = `scale(${newScale})`;
      } else if (direction === 'combined') {
        // New combined effect for really immersive movement
        const yPos = scrollY * parseFloat(speed) * 0.5;
        const xPos = Math.sin(scrollY * 0.01) * 20 * parseFloat(speed);
        const rotationAmount = scrollY * parseFloat(speed) * 0.02;
        el.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotationAmount}deg) scale(${scale})`;
      }
    });
    
    // Add subtle rotation to adinkra symbols based on scroll
    const adinkraElements = document.querySelectorAll('.adinkra-symbol');
    adinkraElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      const rotation = scrollY * 0.02;
      el.style.transform = `rotate(${rotation}deg)`;
    });
    
    // Add depth-of-field effect based on scroll position
    document.body.style.setProperty('--scroll-depth', `${Math.min(scrollY / 1000, 1)}`);
  });
  
  // Add cinematic cursor effects
  const cursorEffects = () => {
    let trailElements: HTMLElement[] = [];
    const maxTrails = 5;
    
    // Create trail elements
    for (let i = 0; i < maxTrails; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = `${1 - (i * 0.2)}`;
      trail.style.width = `${10 - (i * 1.5)}px`;
      trail.style.height = `${10 - (i * 1.5)}px`;
      document.body.appendChild(trail);
      trailElements.push(trail);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      // Update cursor glows
      document.querySelectorAll('.cursor-glow').forEach((el) => {
        const element = el as HTMLElement;
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        element.style.setProperty('--x', `${x}%`);
        element.style.setProperty('--y', `${y}%`);
      });
      
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
  
  cursorEffects();
  
  // Add Adinkra symbols to all pages if they don't have them
  const addAdinkraToPages = () => {
    const pageContainers = document.querySelectorAll('main, section');
    pageContainers.forEach(container => {
      if (!container.classList.contains('adinkra-bg') && !container.querySelector('.adinkra-bg')) {
        container.classList.add('adinkra-bg');
      }
    });
  };
  
  addAdinkraToPages();
  
  // Add subtle ambient movement to Adinkra symbols
  const animateAdinkraSymbols = () => {
    const adinkraElements = document.querySelectorAll('.adinkra-symbol');
    
    adinkraElements.forEach((element, index) => {
      const el = element as HTMLElement;
      // Create unique animation pattern for each symbol
      const delay = index * 0.2;
      const duration = 10 + (index % 5) * 2;
      const amplitude = 5 + (index % 3) * 2;
      
      el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      el.style.animationDirection = index % 2 === 0 ? 'alternate' : 'alternate-reverse';
    });
  };
  
  animateAdinkraSymbols();
};

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initCinematicScroll);
  
  // Re-initialize on route changes for single-page applications
  window.addEventListener('popstate', initCinematicScroll);
}

// Expose the function for manual triggering
export default initCinematicScroll;
