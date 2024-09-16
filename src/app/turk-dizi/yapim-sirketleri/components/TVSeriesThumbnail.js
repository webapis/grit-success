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
  Tooltip,
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

  const getStateColor = (state) => {
    switch (state) {
      case 'Devam ediyor':
        return '#4caf50';  // Yeşil
      case 'Sezon arası':
        return '#ff9800';  // Turuncu
      case 'Sona erdi':
        return '#f44336';  // Kırmızı
      default:
        return '#9e9e9e';  // Gri
    }
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
            height={isMobile ? "75" : "120"}
            image={series.thumbnail}
            alt={series.title}
            sx={{ objectFit: 'cover', cursor: 'pointer' }}
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
          <Typography 
            variant="caption" 
            sx={{ 
              color: getStateColor(series.state),
              fontWeight: 'bold',
              fontSize: isMobile ? '0.5rem' : '0.6rem',
            }}
          >
            {series.state}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ p: 1, flexGrow: 1 }}>
        <Tooltip title={series.title} enterDelay={500} leaveDelay={200}>
          <Typography variant={isMobile ? "caption" : "subtitle2"} component="div" noWrap>
            {series.title}
          </Typography>
        </Tooltip>
        <Typography variant="caption" color="text.secondary">
          {series.year}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Son Bölüm: {series.lastEpisode}
        </Typography>
        {series.productionCompanies && (
          <Tooltip title={series.productionCompanies.join(', ')} enterDelay={500} leaveDelay={200}>
            <Typography variant="caption" color="text.secondary" display="block" noWrap>
              Yapım: {series.productionCompanies.join(', ')}
            </Typography>
          </Tooltip>
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
      <Box sx={{ mt: 'auto' }}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          size="small"
          fullWidth
          onClick={handleClick}
          sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}
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