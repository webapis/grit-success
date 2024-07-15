import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Button } from '@mui/material';
const TVSeriesThumbnail = ({ series, isMobile }) => {
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
      <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          height={isMobile ? "75" : "120"}
          image={series.thumbnail}
          alt={series.title}
          sx={{ objectFit: 'cover', cursor: 'pointer' }}
        />
      </a>
      <CardContent sx={{ p: 1, flexGrow: 1 }}>
        <Typography variant={isMobile ? "caption" : "subtitle2"} component="div" noWrap>
          {series.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {series.year}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1, mt: 'auto' }}>
  <Button 
    variant="" 
    size="small" 
    startIcon={
      <img 
        src={series.channelLogo} 
        alt={`${series.channelName} logo`}
        style={{
          width: isMobile ? '20px' : '24px',
          height: 'auto',
        }}
      />
    }
    href={series.streamingUrl}
    target="_blank"
    rel="noopener noreferrer"
    fullWidth
  >
    İzle
  </Button>
</Box>
    </Card>
  );
};

export default TVSeriesThumbnail;