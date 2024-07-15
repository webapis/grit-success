import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LanguageIcon from '@mui/icons-material/Language';

const TVSeriesCompany = ({ company }) => {
  const [displayedSeriesCount, setDisplayedSeriesCount] = useState(5);
  const scrollContainerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleShowMore = () => {
    setDisplayedSeriesCount(company.tvSeries.length);
  };

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
    <Card sx={{ maxWidth: '100%', margin: 'auto', marginBottom: 4 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ width: '100%', maxWidth: 120, margin: 'auto' }}>
              <Image
                src={company.logo}
                alt={company.title}
                width={120}
                height={60}
                layout="responsive"
                objectFit="contain"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant={isMobile ? "h6" : "h5"} component="div" gutterBottom>
              {company.title}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary" paragraph>
              {company.description}
            </Typography>
            <Link
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <LanguageIcon sx={{ mr: 0.5, fontSize: 'small' }} />
              <Typography variant="body2">
                Visit Website
              </Typography>
            </Link>
          </Grid>
        </Grid>

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
            {company.tvSeries.slice(0, displayedSeriesCount).map((series) => (
              <Card key={series.id} sx={{ 
                minWidth: isMobile ? 100 : 160, 
                maxWidth: isMobile ? 100 : 160, 
                mr: 2, 
                flexShrink: 0,
                mb: 1,
              }}>
                <CardMedia
                  component="img"
                  height={isMobile ? "75" : "120"}
                  image={series.thumbnail}
                  alt={series.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant={isMobile ? "caption" : "subtitle2"} component="div" noWrap>
                    {series.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {series.year}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {displayedSeriesCount < company.tvSeries.length && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minWidth: isMobile ? 100 : 160, 
                maxWidth: isMobile ? 100 : 160 
              }}>
                <Button variant="contained" onClick={handleShowMore} size="small">
                  Show More
                </Button>
              </Box>
            )}
          </Box>
          {!isMobile && <ScrollButton direction="right" onClick={() => scroll(200)} />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TVSeriesCompany;