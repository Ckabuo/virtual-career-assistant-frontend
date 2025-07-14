// src/components/ScrollToTop/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Adding a small delay to ensure content has rendered and page layout is stable
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      console.log(`Scrolled to top on route change to: ${pathname}`);
    }, 1000); // You can adjust this delay (e.g., 50ms, 150ms) if needed

    return () => clearTimeout(timer); // Cleanup
  }, [pathname]); // Re-run effect when pathname changes

  return null; // This component doesn't render anything visually
}