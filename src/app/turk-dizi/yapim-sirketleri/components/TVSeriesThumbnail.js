'use client'

import React, { memo, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
  Skeleton,
  Stack,
  IconButton,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  AccessTime as AccessTimeIcon,
  Movie as MovieIcon,
} from '@mui/icons-material';

const WatchOptionMenuItem = memo(({ option, onClose }) => (
  <MenuItem
    onClick={() => {
      window.open(option.url, '_blank');
      onClose();
    }}
    sx={{
      gap: 1,
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    }}
  >
    <Box
      component="img"
      src={`${process.env.NEXT_PUBLIC_IMG_HOST}${option.logo}`}
      alt={option.name}
      sx={{
        width: 20,
        height: 20,
        objectFit: 'contain',
      }}
    />
    <Typography variant="body2">{option.name}</Typography>
  </MenuItem>
));

WatchOptionMenuItem.displayName = 'WatchOptionMenuItem';

const TVSeriesThumbnail = memo(({ series, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const hasWatchOptions = series.watchOptions?.length > 0;

  const getStateColor = useCallback((state) => {
    switch (state) {
      case 'Devam ediyor': return '#4caf50';
      case 'Sezon arası': return '#ff9800';
      case 'Sona erdi': return '#f44336';
      default: return '#9e9e9e';
    }
  }, []);

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
        <Box
          component="a"
          href={series.streamingUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            '&:hover': {
              '& .MuiCardMedia-root': {
                transform: 'scale(1.05)',
              },
            },
          }}
        >
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave"
            />
          )}
          <CardMedia
            component="img"
            image={series.thumbnail.replace('https://www.nowtv.com.tr/', '')}
            alt={series.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              opacity: imageLoaded ? 1 : 0,
            }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '4px',
            padding: '4px 8px',
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: getStateColor(series.state),
              fontWeight: 'bold',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
            {series.state}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 1, '&:last-child': { pb: 1 } }}>
        <Tooltip title={series.title} enterDelay={500} leaveDelay={200}>
          <Typography variant="body2" component="div" noWrap sx={{ fontWeight: 'bold', textTransform: "capitalize" }}>
            {series.title}
          </Typography>
        </Tooltip>

        <Typography variant="caption" color="text.secondary">
          {series.year ? series.year : '_'}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {series.lastEpisode ? `Son Bölüm: ${series.lastEpisode}` : '_'}
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
          sx={{ 
            fontSize: '0.7rem',
            textTransform: 'none',
            fontWeight: 500,
          }}
          disabled={!hasWatchOptions}
        >
          İzle
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            elevation: 3,
            sx: { mt: 1 }
          }}
        >
          {hasWatchOptions && series.watchOptions.map((option, index) => (
            <WatchOptionMenuItem 
              key={index} 
              option={option} 
              onClose={handleClose}
            />
          ))}
        </Menu>
      </Box>
    </Card>
  );
});

TVSeriesThumbnail.displayName = 'TVSeriesThumbnail';

export default TVSeriesThumbnail;