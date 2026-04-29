import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Debounce function for resize events
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Initialize global scroll animations handler
export const initializeScrollAnimations = () => {
  // Refresh ScrollTrigger on window resize (with debounce)
  const handleResize = debounce(() => {
    ScrollTrigger.refresh();
  }, 300);

  // Handle resize events
  window.addEventListener("resize", handleResize);

  // Handle orientation change
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });

  // Cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", () => {
      ScrollTrigger.refresh();
    });
  };
};

// Safely refresh all ScrollTriggers
export const refreshScrollTriggers = () => {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
};

// Kill all animations (useful for cleanup)
export const killAllAnimations = () => {
  gsap.killTweensOf("*");
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
