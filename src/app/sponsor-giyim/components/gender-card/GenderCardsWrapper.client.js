'use client';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeConfig } from './themeConfig';

const GenderCardsWrapper = ({ children }) => {
  const theme = createTheme(themeConfig);
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default GenderCardsWrapper;