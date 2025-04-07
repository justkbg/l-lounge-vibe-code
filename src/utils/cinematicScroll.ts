
export const initCinematicScroll = () => {
  const scrollContainer = document.querySelector(".scroll-container");
  const parallaxSections = document.querySelectorAll(".parallax-section");
  const cinematicReveals = document.querySelectorAll(".cinematic-reveal");
  const verticalReveals = document.querySelectorAll(".vertical-reveal");

  if (!scrollContainer) {
    console.warn("No .scroll-container found. Cinematic scroll not initialized.");
    return;
  }

  // Function to handle parallax effect
  const handleParallax = () => {
    parallaxSections.forEach((section) => {
      // Type assertion to access dataset property
      const htmlSection = section as HTMLElement;
      const depth = parseFloat(htmlSection.dataset.depth || "0.2");
      const translateY = window.scrollY * depth;
      htmlSection.style.transform = `translateY(${translateY}px)`;
    });
  };

  // Function to handle cinematic reveal
  const handleCinematicReveal = () => {
    cinematicReveals.forEach((element) => {
      const bounding = element.getBoundingClientRect();
      const isVisible = bounding.top < window.innerHeight * 0.75; // Reveal when 75% of the element is visible

      if (isVisible) {
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
    });
  };

  // Function to handle vertical reveal
  const handleVerticalReveal = () => {
    verticalReveals.forEach((element) => {
      const bounding = element.getBoundingClientRect();
      const isVisible = bounding.top < window.innerHeight * 0.8; // Reveal when 80% of the element is visible

      if (isVisible) {
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
    });
  };

  // Initial call to set initial positions
  handleParallax();
  handleCinematicReveal();
  handleVerticalReveal();

  // Listen for scroll events
  window.addEventListener("scroll", () => {
    handleParallax();
    handleCinematicReveal();
    handleVerticalReveal();
  });
};

// When applying styles to elements, use type casting to HTMLElement
// Example:
const element = document.querySelector('.some-selector');
if (element) {
  (element as HTMLElement).style.transform = 'translateY(20px)';
  (element as HTMLElement).style.opacity = '1';
}
