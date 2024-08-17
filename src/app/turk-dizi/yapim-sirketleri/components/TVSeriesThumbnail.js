// src/components/TVSeriesThumbnail.js
'use client'
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TVSeriesThumbnail = ({ series, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hasWatchOptions = series.watchOptions && series.watchOptions.length > 0;

  return (
    <Card sx={{ 
      minWidth: isMobile ? 140 : 160, 
      maxWidth: isMobile ? 140 : 160, 
      mr: 2, 
      flexShrink: 0,
      mb: 1,
      display: 'flex',
      flexDirection: 'column',
    }} id={series.sha}>
      <Box sx={{ position: 'relative' }}>
        <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer" >
          <CardMedia
            component="img"
            sx={{
              width: isMobile ? '100px' : '150px',
              height: isMobile ? '150px' : '200px',
              objectFit: 'cover',
              cursor: 'pointer',
              maxWidth: '100%', // Ensure the image does not overflow
            }}
            image={series.thumbnail}
            alt={series.title}
          />
        </a>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 1, // Adjust padding if needed
          overflow: 'hidden', // Ensure the content does not overflow
        }}
      >
        <CardContent sx={{ p: 0, flex: '1 0 auto' }}>
          <Typography variant={isMobile ? 'caption' : 'subtitle2'} component="div" noWrap>
            {series.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {series.year}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Son Bölüm: {series.lastEpisode}
          </Typography>
          {series.productionCompanies && (
            <Typography variant="caption" color="text.secondary" display="block" noWrap>
              Yapım: {series.productionCompanies.join(', ')}
            </Typography>
          )}
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {series.genres && series.genres.map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                size="small"
                sx={{
                  fontSize: isMobile ? '0.5rem' : '0.6rem',
                  height: 'auto',
                  '& .MuiChip-label': {
                    padding: '2px 4px',
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 0 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            size="small"
            onClick={handleClick}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}
            disabled={!hasWatchOptions}
          >
            İzle
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
      </Box>
    </Card>
  );
};

export default TVSeriesThumbnail;
