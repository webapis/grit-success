import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

const TVSeriesThumbnail = ({ series, isMobile }) => {
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

  return (
    <Card sx={{ 
      minWidth: isMobile ? 100 : 160, 
      maxWidth: isMobile ? 100 : 160, 
      mr: 2, 
      flexShrink: 0,
      mb: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ position: 'relative' }}>
        <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer">
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
        <Typography variant={isMobile ? "caption" : "subtitle2"} component="div" noWrap>
          {series.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {series.year}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Son Bölüm: {series.lastEpisode}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1, mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ cursor: 'pointer', color: 'primary.main' }}>
          İzle
        </Typography>
        <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer">
          <img 
            src={series.channelLogo} 
            alt={`${series.channelName} logo`}
            style={{
              width: isMobile ? '20px' : '30px',
              height: 'auto',
              cursor: 'pointer'
            }}
          />
        </a>
      </Box>
    </Card>
  );
};

export default TVSeriesThumbnail;