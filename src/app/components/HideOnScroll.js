'use client'

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function HideOnScroll({ children }) {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrevScrollPos(window.scrollY);
    }

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Show header immediately when scrolling up starts
      if (isScrollingUp) {
        setIsVisible(true);
      } else {
        // Hide header only when scrolling down and past threshold
        setIsVisible(currentScrollPos <= 100);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        transition: 'transform 0.2s ease-in-out',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        backgroundColor: 'background.paper',
        boxShadow: isVisible ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
        willChange: 'transform',
      }}
    >
      {children}
    </Box>
  );
} 