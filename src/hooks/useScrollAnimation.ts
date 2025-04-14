
import { useEffect, RefObject } from 'react';

interface ScrollAnimationOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  const {
    selector = '.animate-on-scroll',
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    onIntersect = (entry) => {
      entry.target.classList.add('visible');
    }
  } = options;

  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const elements = selector ? element.querySelectorAll(selector) : [element];
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin });
    
    elements.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [ref, selector, threshold, rootMargin, onIntersect]);
};

// Helper function for creating scroll progress indicators
export const createScrollProgressIndicator = () => {
  // Remove any existing indicators
  const existingIndicator = document.querySelector('.scroll-progress-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }
  
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'fixed bottom-0 left-0 h-1 bg-primary z-50 scroll-progress-indicator';
  document.body.appendChild(scrollProgress);
  
  const updateScrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / windowHeight;
    scrollProgress.style.width = `${scrolled * 100}%`;
  };
  
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // Initial call
  
  return () => {
    window.removeEventListener('scroll', updateScrollProgress);
    if (scrollProgress.parentNode) {
      scrollProgress.parentNode.removeChild(scrollProgress);
    }
  };
};
