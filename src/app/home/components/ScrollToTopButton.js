'use client'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useScrollTrigger, Zoom } from '@mui/material';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Button
      variant='outlined'
      size='small'
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: isVisible ? 'block' : 'none',
        }}
      >
        <KeyboardArrowUpIcon />
      </Button>
    </Zoom>
  );
};

export default ScrollToTopButton;
