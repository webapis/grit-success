'use client'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
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
      case 'Devam ediyor': return '#4caf50';
      case 'Sezon arası': return '#ff9800';
      case 'Sona erdi': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const hasWatchOptions = series.watchOptions && series.watchOptions.length > 0;

  return (
    <Card sx={{ 
   
      width: '100%',
      mb: 2,
    }} id={series.sha}>
      <Box sx={{ position: 'relative', width: '100%', flexShrink: 0 }}>
        <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer">
          <CardMedia
            component="img"
            sx={{ height: '100%', objectFit: 'cover' }}
            image={series.thumbnail.replace('https://www.nowtv.com.tr/','')}
            alt={series.title}
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
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 1 }}>
          <Tooltip title={series.title} enterDelay={500} leaveDelay={200}>
            <Typography variant={isMobile ? "body2" : "h6"} component="div" noWrap style={{textTransform:'capitalize'}}>
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
        <Box sx={{ p: 1, pt: 0 }}>
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
      </Box>
    </Card>
  );
};

export default TVSeriesThumbnail;