'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Menu, MenuItem, Chip, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Skeleton from '@mui/material/Skeleton';

const TVSeriesThumbnail = ({ series, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStateColor = (state) => {
    switch (state) {
      case 'Devam ediyor': return '#4caf50';
      case 'Sezon arası': return '#ff9800';
      case 'Sona erdi': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const hasWatchOptions = series.watchOptions && series.watchOptions.length > 0;

  useEffect(() => {
    const img = new Image();
    img.src = series.thumbnail.replace('https://www.nowtv.com.tr/','');
    img.onload = () => setImageLoaded(true);
  }, [series.thumbnail]);

  return (
    <Card sx={{ width: '100%', mb: 1, display: 'flex', flexDirection: 'column', height: '100%' }} id={series.sha}>
      <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
        <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {!imageLoaded && (
            <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
          )}
          <CardMedia
            component="img"
            image={series.thumbnail.replace('https://www.nowtv.com.tr/','')}
            alt={series.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 300ms',
              opacity: imageLoaded ? 1 : 0,
            }}
            loading="lazy"
          />
        </a>
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '4px',
            padding: '2px 4px',
          }}
        >
          <Typography variant="caption" sx={{ color: getStateColor(series.state), fontWeight: 'bold', fontSize: '0.6rem' }}>
            {series.state}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 1, '&:last-child': { pb: 1 } }}>
        <Tooltip title={series.title} enterDelay={500} leaveDelay={200}>
          <Typography variant="body2" component="div" noWrap sx={{ fontWeight: 'bold', textTransform:"capitalize" }}>
            {series.title}
          </Typography>
        </Tooltip>

        <Typography variant="caption" color="text.secondary">
          {series.year ?series.year:'_'}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
            {series.lastEpisode? `Son Bölüm: ${series.lastEpisode}`:'_'}
          </Typography>
       
   
          {series.productionCompanies && (
            <Tooltip title={series.productionCompanies.join(', ')} enterDelay={500} leaveDelay={200}>
              <Typography variant="caption" color="text.secondary" display="block" noWrap>
             {series.productionCompanies.join(', ')}
              </Typography>
            </Tooltip>
          )}
        <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {series.genres && series.genres.slice(0, 2).map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              size="small"
              sx={{
                fontSize: '0.5rem',
                height: 'auto',
                '& .MuiChip-label': {
                  padding: '1px 4px',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <Box sx={{ p: 1, pt: 0, mt: 'auto' }}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          size="small"
          fullWidth
          onClick={handleClick}
          sx={{ fontSize: '0.7rem' }}
          disabled={!hasWatchOptions}
        >
          İzle
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {hasWatchOptions && series.watchOptions.map((option, index) => (
            <MenuItem 
              key={index} 
              onClick={() => {
                window.open(option.url, '_blank');
                handleClose();
              }}
            >
              <img 
                src={option.logo} 
                alt={option.name}
                style={{ width: '20px', marginRight: '8px' }}
              />
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Card>
  );
};

export default TVSeriesThumbnail;