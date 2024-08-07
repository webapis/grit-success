'use client'
import React, { useRef } from 'react';
import {
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TVSeriesThumbnail from './TVSeriesThumbnail';

const TVSeriesList = ({ companyId, tvSeries, displayedSeriesCount = 5 }) => {
  const scrollContainerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const ScrollButton = ({ direction, onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        [direction]: -20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: 2,
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 1)',
        },
      }}
    >
      {direction === 'left' ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ mt: 2, mb: 2 }}>
        Son TV Dizileri
      </Typography>
      <Box sx={{ position: 'relative', mb: 2 }}>
      
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            overflowX: 'hidden',
            pl: isMobile ? 1 : 4,
            pr: isMobile ? 1 : 4,
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.grey[200],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '2px',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.primary.main} ${theme.palette.grey[200]}`,
          }}
        >
          {tvSeries.slice(0, displayedSeriesCount).map((series) => (
            <TVSeriesThumbnail key={series.id} series={series} isMobile={isMobile} />
          ))}
        </Box>
      
      </Box>
      {tvSeries.length > displayedSeriesCount && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-1px',
              left: '10%',
              right: '10%',
              height: '1px',
              bgcolor: 'divider',
            },
          }}
        >
          <Link href={`/turk-dizi/yapim-sirketleri/${companyId}`} passHref legacyBehavior>
            <Button
              component="a"
              variant="text"
              color="primary"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                  bgcolor: 'transparent',
                },
                fontSize: '0.9rem',
                fontWeight: 'medium',
                pt: 2,
              }}
            >
              Daha fazla göster
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default TVSeriesList;