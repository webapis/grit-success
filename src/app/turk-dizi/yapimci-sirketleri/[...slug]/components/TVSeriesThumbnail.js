import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

const TVSeriesThumbnail = ({ series, isMobile }) => {
  return (
    <Card sx={{ 
      minWidth: isMobile ? 100 : 160, 
      maxWidth: isMobile ? 100 : 160, 
      mr: 2, 
      flexShrink: 0,
      mb: 1,
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
      <CardContent sx={{ p: 1 }}>
        <Typography variant={isMobile ? "caption" : "subtitle2"} component="div" noWrap>
          {series.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {series.year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TVSeriesThumbnail;