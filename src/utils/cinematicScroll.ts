
/**
 * Enhanced Cinematic Scroll Utility
 * Provides smooth, movie-like scrolling effects and animations
 */

export const initCinematicScroll = () => {
  const scrollContainer = document.querySelector(".scroll-container");
  const parallaxSections = document.querySelectorAll(".parallax-section");
  const cinematicReveals = document.querySelectorAll(".cinematic-reveal");
  const verticalReveals = document.querySelectorAll(".vertical-reveal");
  const staggeredElements = document.querySelectorAll(".staggered-fade");
  const horizontalReveals = document.querySelectorAll(".horizontal-reveal");
  const zoomElements = document.querySelectorAll(".zoom-reveal");
  const rotateElements = document.querySelectorAll(".rotate-reveal");
  const blurElements = document.querySelectorAll(".blur-reveal");

  if (!scrollContainer) {
    console.warn("No .scroll-container found. Cinematic scroll not initialized.");
    return;
  }

  // Function to handle parallax effect with enhanced smoothness
  const handleParallax = () => {
    parallaxSections.forEach((section) => {
      // Type assertion to access dataset property
      const htmlSection = section as HTMLElement;
      const depth = parseFloat(htmlSection.dataset.depth || "0.2");
      const speed = parseFloat(htmlSection.dataset.speed || "0.5");
      const direction = htmlSection.dataset.direction || "vertical";
      
      // Calculate transform based on scroll position with easing
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * depth * speed;
      
      if (direction === "horizontal") {
        htmlSection.style.transform = `translateX(${translateY}px)`;
      } else if (direction === "both") {
        htmlSection.style.transform = `translate3d(${translateY * 0.3}px, ${translateY}px, 0)`;
      } else {
        htmlSection.style.transform = `translateY(${translateY}px)`;
      }
      
      // Optional opacity effect for depth perception
      if (htmlSection.dataset.fade === "true") {
        const opacity = Math.max(0, Math.min(1, 1 - (translateY * 0.001)));
        htmlSection.style.opacity = opacity.toString();
      }
    });
  };

  // Function to handle cinematic reveal with dramatic timing
  const handleCinematicReveal = () => {
    cinematicReveals.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlElement.dataset.triggerPoint || "0.75");
      const delay = parseFloat(htmlElement.dataset.delay || "0");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;

      if (isVisible) {
        if (!htmlElement.classList.contains("visible")) {
          setTimeout(() => {
            htmlElement.classList.add("visible");
          }, delay * 1000);
        }
      } else if (htmlElement.dataset.once !== "true") {
        htmlElement.classList.remove("visible");
      }
    });
  };

  // Function to handle vertical reveal animations
  const handleVerticalReveal = () => {
    verticalReveals.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlElement.dataset.triggerPoint || "0.8");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;
      const delay = parseFloat(htmlElement.dataset.delay || "0");

      if (isVisible) {
        if (!htmlElement.classList.contains("visible")) {
          setTimeout(() => {
            htmlElement.classList.add("visible");
          }, delay * 1000);
        }
      } else if (htmlElement.dataset.once !== "true") {
        htmlElement.classList.remove("visible");
      }
    });
  };

  // Function to handle staggered reveals
  const handleStaggeredFade = () => {
    staggeredElements.forEach((group) => {
      const htmlGroup = group as HTMLElement;
      const bounding = group.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlGroup.dataset.triggerPoint || "0.8");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;

      if (isVisible) {
        htmlGroup.classList.add("animate");
      } else if (htmlGroup.dataset.once !== "true") {
        htmlGroup.classList.remove("animate");
      }
    });
  };

  // Function to handle horizontal reveal animations
  const handleHorizontalReveal = () => {
    horizontalReveals.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlElement.dataset.triggerPoint || "0.8");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;
      const delay = parseFloat(htmlElement.dataset.delay || "0");
      const direction = htmlElement.dataset.direction || "left";

      if (isVisible) {
        if (!htmlElement.classList.contains("visible")) {
          setTimeout(() => {
            htmlElement.classList.add("visible");
            htmlElement.classList.add(`from-${direction}`);
          }, delay * 1000);
        }
      } else if (htmlElement.dataset.once !== "true") {
        htmlElement.classList.remove("visible");
      }
    });
  };

  // Function to handle zoom reveal animations
  const handleZoomReveal = () => {
    zoomElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlElement.dataset.triggerPoint || "0.8");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;
      const delay = parseFloat(htmlElement.dataset.delay || "0");
      const zoomType = htmlElement.dataset.zoom || "in"; // "in" or "out"

      if (isVisible) {
        if (!htmlElement.classList.contains("visible")) {
          setTimeout(() => {
            htmlElement.classList.add("visible");
            htmlElement.classList.add(`zoom-${zoomType}`);
          }, delay * 1000);
        }
      } else if (htmlElement.dataset.once !== "true") {
        htmlElement.classList.remove("visible");
      }
    });
  };

  // Function to handle rotate reveal animations
  const handleRotateReveal = () => {
    rotateElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlElement.dataset.triggerPoint || "0.8");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;
      const delay = parseFloat(htmlElement.dataset.delay || "0");
      const degrees = parseFloat(htmlElement.dataset.degrees || "10");
      const direction = htmlElement.dataset.direction || "clockwise";

      if (isVisible) {
        if (!htmlElement.classList.contains("visible")) {
          setTimeout(() => {
            htmlElement.classList.add("visible");
            // Apply rotation based on direction
            const rotateValue = direction === "clockwise" ? degrees : -degrees;
            htmlElement.style.transform = `rotate(${rotateValue}deg)`;
          }, delay * 1000);
        }
      } else if (htmlElement.dataset.once !== "true") {
        htmlElement.classList.remove("visible");
        htmlElement.style.transform = `rotate(0deg)`;
      }
    });
  };

  // Function to handle blur reveal animations
  const handleBlurReveal = () => {
    blurElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const triggerPoint = parseFloat(htmlElement.dataset.triggerPoint || "0.8");
      const isVisible = bounding.top < window.innerHeight * triggerPoint;
      const delay = parseFloat(htmlElement.dataset.delay || "0");
      const blurAmount = parseFloat(htmlElement.dataset.blur || "5");

      if (isVisible) {
        if (!htmlElement.classList.contains("visible")) {
          setTimeout(() => {
            htmlElement.classList.add("visible");
            htmlElement.style.filter = "blur(0px)";
          }, delay * 1000);
        }
      } else if (htmlElement.dataset.once !== "true") {
        htmlElement.classList.remove("visible");
        htmlElement.style.filter = `blur(${blurAmount}px)`;
      }
    });
  };

  // Smooth scroll function
  const enableSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href') as string;
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000; // ms
        let start: number | null = null;
        
        const animateScroll = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          
          // Easing function for smoother animation
          const easeInOutCubic = (t: number) => 
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            
          window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
          
          if (progress < duration) {
            window.requestAnimationFrame(animateScroll);
          }
        };
        
        window.requestAnimationFrame(animateScroll);
      });
    });
  };

  // Apply initial scroll effects
  handleParallax();
  handleCinematicReveal();
  handleVerticalReveal();
  handleStaggeredFade();
  handleHorizontalReveal();
  handleZoomReveal();
  handleRotateReveal();
  handleBlurReveal();
  enableSmoothScroll();

  // Add scroll event listener with debounce for performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        handleCinematicReveal();
        handleVerticalReveal();
        handleStaggeredFade();
        handleHorizontalReveal();
        handleZoomReveal();
        handleRotateReveal();
        handleBlurReveal();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Add resize event listener
  window.addEventListener("resize", () => {
    handleParallax();
    handleCinematicReveal();
    handleVerticalReveal();
    handleStaggeredFade();
    handleHorizontalReveal();
    handleZoomReveal();
    handleRotateReveal();
    handleBlurReveal();
  });
};

// Helper function to trigger animations manually
export const triggerAnimation = (elementSelector: string, animationClass: string, delay: number = 0) => {
  const element = document.querySelector(elementSelector) as HTMLElement;
  if (element) {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, delay);
  }
};

// Helper to add parallax to elements dynamically
export const addParallaxEffect = (elementSelector: string, depth: number = 0.2, direction: string = 'vertical') => {
  const element = document.querySelector(elementSelector) as HTMLElement;
  if (element) {
    element.classList.add('parallax-section');
    element.dataset.depth = depth.toString();
    element.dataset.direction = direction;
  }
};
