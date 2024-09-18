import React, { useState, useEffect } from 'react';
import { Typography, Grid, Chip, Paper, Accordion, AccordionSummary, AccordionDetails, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import extractSubdomain from './extractSubdomain';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
}));

const StyledImg = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: 100,
  objectFit: 'contain',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ViewCounter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const WebsiteInfoComponent = ({ data, initialViews = 0 }) => {
  const { brandTag, Website, duplicateTitles, TVSeriesTitle, h3, Acyklama, ServiceName } = data;
  const hostname = new URL(Website).hostname;
  const imageName = brandTag || extractSubdomain(Website);
  const [expanded, setExpanded] = useState(false);
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Simulate view count increase
    const timer = setTimeout(() => {
      setViews(prevViews => prevViews + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = () => setExpanded(!expanded);

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledImg
            alt={`${imageName} brand logo`}
            src={`/dizi/marka/${imageName}.jpg`}
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button 
              component="a"
              href={Website}
              target='_blank'
              endIcon={<OpenInNewIcon />}
              variant='outlined'
              size='small'
              sx={{ textTransform: 'none' }}
            >
              {hostname}
            </Button>
            <Tooltip title="Views">
              <ViewCounter>
                <VisibilityIcon fontSize="small" />
                <Typography variant="body2">{views}</Typography>
              </ViewCounter>
            </Tooltip>
          </Box>
          <Typography variant="h5" gutterBottom>{h3}</Typography>
          <Typography variant="body1" paragraph>{Acyklama}</Typography>
          <Box sx={{ mb: 2 }}>
            {ServiceName.split(',').map((service, index) => (
              <Chip 
                key={index}
                label={service.trim()}
                sx={{ mr: 1, mb: 1, textTransform: 'lowercase' }}
                clickable
              />
            ))}
          </Box>
          <Accordion 
            expanded={expanded} 
            onChange={handleChange}
            sx={{ 
              '&:before': { display: 'none' },
              boxShadow: 'none',
              backgroundColor: 'transparent'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="sponsorship-content"
              id="sponsorship-header"
            >
              <Typography fontWeight="bold">
              Sponsorluk Faaliyetleri
                <Chip 
                  label={`Toplam: ${duplicateTitles ? duplicateTitles.length : 1}`} 
                  size="small" 
                  color="primary" 
                  sx={{ ml: 1 }}
                />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {duplicateTitles ? 
                  duplicateTitles.filter(Boolean).map((title, i) => (
                    <Chip key={i} label={title} size="small" sx={{ mr: 1, mb: 1 }} />
                  ))
                  : 
                  <Chip label={TVSeriesTitle} size="small" />
                }
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default WebsiteInfoComponent;

/*
import React from 'react';
import { Card, CardContent, CardHeader, CardActions, Typography, Grid, Chip, Button } from '@mui/material';

const EvTekstiliWebSiteleri = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" component="div">
                  {item.Name}
                </Typography>
              }
              subheader={
                <Chip label={item.TVSeriesTitle} size="small" color="secondary" />
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.ServiceName}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {item.Acyklama}
              </Typography>
              {item.h3 && (
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  "{item.h3}"
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={item.Website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Web Sitesini Ziyaret Et
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EvTekstiliWebSiteleri;
*/