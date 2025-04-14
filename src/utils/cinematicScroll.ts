
/**
 * Cinema-quality scroll effects
 * Adds smooth parallax, reveal animations, and dynamic lighting on scroll
 */

interface CinematicOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  revealClass?: string;
  parallaxSelector?: string;
  parallaxSpeedAttribute?: string;
  cursorTrail?: boolean;
  spotlightEffect?: boolean;
  adinkraParallax?: boolean;
}

export const initCinematicScroll = (options: CinematicOptions = {}) => {
  const {
    selector = '.reveal-on-scroll',
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    revealClass = 'visible',
    parallaxSelector = '[data-parallax]',
    parallaxSpeedAttribute = 'data-speed',
    cursorTrail = true,
    spotlightEffect = true,
    adinkraParallax = true
  } = options;

  // Initialize reveal on scroll
  const initRevealOnScroll = () => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(revealClass);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin });
    
    elements.forEach((element) => {
      observer.observe(element);
    });
  };
  
  // Initialize parallax effect
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll(parallaxSelector);
    
    if (parallaxElements.length === 0) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute(parallaxSpeedAttribute) || '0.1');
        const direction = element.getAttribute('data-direction') || 'up';
        
        let yPos = 0;
        
        if (direction === 'up') {
          yPos = -scrollY * speed;
        } else if (direction === 'down') {
          yPos = scrollY * speed;
        } else if (direction === 'combined') {
          // Combined movement for more natural feel
          const elementRect = element.getBoundingClientRect();
          const elementCenterY = elementRect.top + elementRect.height / 2;
          const viewportCenterY = window.innerHeight / 2;
          const distance = elementCenterY - viewportCenterY;
          yPos = distance * speed * -0.2; // Make speed relate to element position
        }
        
        // Apply 3D transform for hardware acceleration
        const transform = `translate3d(0, ${yPos}px, 0)`;
        
        if (element instanceof HTMLElement) {
          element.style.transform = transform;
        }
      });
    };
    
    // Initial call to set positions
    handleScroll();
    
    // Add throttled scroll listener for better performance
    let lastScrollTime = 0;
    const scrollThreshold = 10;
    
    window.addEventListener('scroll', () => {
      const now = Date.now();
      
      if (now - lastScrollTime > scrollThreshold) {
        lastScrollTime = now;
        window.requestAnimationFrame(handleScroll);
      }
    });
  };
  
  // Initialize cursor trail effect
  const initCursorTrail = () => {
    if (!cursorTrail) return;
    
    // Remove existing cursor trails if any
    const existingTrails = document.querySelectorAll('.cursor-trail');
    existingTrails.forEach(trail => trail.remove());
    
    // Create cursor trail elements
    const numTrails = 5;
    const trails: HTMLDivElement[] = [];
    
    for (let i = 0; i < numTrails; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = `${(numTrails - i) / numTrails * 0.3}`;
      document.body.appendChild(trail);
      trails.push(trail);
    }
    
    // Trail positions array
    const positions: {x: number, y: number}[] = Array(numTrails).fill({x: 0, y: 0});
    
    // Update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      // Update new cursor position
      positions.pop();
      positions.unshift({x: e.clientX, y: e.clientY});
      
      // Update elements
      trails.forEach((trail, index) => {
        const pos = positions[index] || positions[0];
        trail.style.left = `${pos.x}px`;
        trail.style.top = `${pos.y}px`;
      });
    };
    
    // Hide trails when mouse leaves window
    const handleMouseLeave = () => {
      trails.forEach(trail => {
        trail.style.opacity = '0';
      });
    };
    
    // Show trails when mouse enters window
    const handleMouseEnter = () => {
      trails.forEach((trail, index) => {
        trail.style.opacity = `${(numTrails - index) / numTrails * 0.3}`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
  };
  
  // Initialize spotlight effect
  const initSpotlightEffect = () => {
    if (!spotlightEffect) return;
    
    const elements = document.querySelectorAll('.spotlight-effect');
    
    if (elements.length === 0) return;
    
    elements.forEach(element => {
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        (element as HTMLElement).style.setProperty('--x', `${x}%`);
        (element as HTMLElement).style.setProperty('--y', `${y}%`);
      });
    });
  };
  
  // Initialize adinkra parallax effect
  const initAdinkraParallax = () => {
    if (!adinkraParallax) return;
    
    const adinkraSymbols = document.querySelectorAll('.adinkra-symbol');
    
    if (adinkraSymbols.length === 0) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Mouse position normalized to -1 to 1
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      
      adinkraSymbols.forEach((symbol) => {
        // Random offset factor for each symbol
        const factor = parseFloat((symbol as HTMLElement).dataset.factor || '1');
        const moveX = mouseX * 10 * factor;
        const moveY = mouseY * 10 * factor;
        
        // Apply subtle movement
        (symbol as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) rotate(${mouseX * 5}deg)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add random factor to each symbol
    adinkraSymbols.forEach((symbol) => {
      const factor = 0.5 + Math.random();
      (symbol as HTMLElement).dataset.factor = factor.toString();
    });
  };
  
  // Initialize all cinematic effects
  initRevealOnScroll();
  initParallax();
  initCursorTrail();
  initSpotlightEffect();
  initAdinkraParallax();
  
  // Re-run on window resize for responsiveness
  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      initParallax();
    }, 100);
  });
};

// Utility to create scene transitions
export const createSceneTransition = (callback: () => void, direction: 'in' | 'out' = 'in') => {
  const transitionElement = document.querySelector('.scene-transition');
  
  if (!transitionElement) {
    console.error('Scene transition element not found. Add <div class="scene-transition"></div> to your component.');
    callback();
    return;
  }
  
  // Add active class to start transition
  transitionElement.classList.add('active');
  if (direction === 'out') {
    transitionElement.classList.add('out');
  }
  
  // Wait for transition to complete
  setTimeout(() => {
    // Execute callback
    callback();
    
    // Complete the transition
    setTimeout(() => {
      transitionElement.classList.remove('active');
      if (direction === 'out') {
        transitionElement.classList.remove('out');
      }
    }, 50);
  }, 700); // Match this to your transition duration
};
