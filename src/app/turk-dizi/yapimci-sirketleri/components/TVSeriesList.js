'use client'
import React, { useRef } from 'react';
import {
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
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
    <>
      <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ mt: 2, mb: 2 }}>
        Recent TV Series
      </Typography>
      <Box sx={{ position: 'relative', mb: 3 }}>
        {!isMobile && <ScrollButton direction="left" onClick={() => scroll(-200)} />}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            pl: isMobile ? 1 : 4,
            pr: isMobile ? 1 : 4,
            mb: 2,
            ...(isMobile ? {
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
            } : {
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }),
          }}
        >
          {tvSeries.slice(0, displayedSeriesCount).map((series) => (
            <TVSeriesThumbnail key={series.id} series={series} isMobile={isMobile} />
          ))}
          {tvSeries.length > displayedSeriesCount && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minWidth: isMobile ? 100 : 160, 
              maxWidth: isMobile ? 100 : 160 
            }}>
              <Link href={`/turk-dizi/yapimci-sirketleri/${companyId}`} passHref legacyBehavior>
                <MuiLink
                  component="a"
                  variant="button"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Show More
                </MuiLink>
              </Link>
            </Box>
          )}
        </Box>
        {!isMobile && <ScrollButton direction="right" onClick={() => scroll(200)} />}
      </Box>
    </>
  );
};

export default TVSeriesList;