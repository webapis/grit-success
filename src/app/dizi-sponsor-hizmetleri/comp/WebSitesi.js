import React, { useState } from 'react';
import { Typography, Grid, Chip, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import extractSubdomain from './extractSubdomain';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WebsiteInfoComponent = ({ data }) => {
    const { brandTag, Website, duplicateTitles, TVSeriesTitle, h3, Acyklama, ServiceName } = data;
    const hostname = new URL(Website).hostname;
    const imageName = brandTag || extractSubdomain(Website);
    const [expanded, setExpanded] = useState(false);
    
    const handleChange = () => {
        setExpanded(!expanded);
    };
    
    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <img
                        alt={`${imageName} brand logo`}
                        style={{ width: '100%', height: 'auto', maxHeight: 80, objectFit: 'contain' }}
                        src={`/dizi/marka/${imageName}.jpg`}
                        loading="lazy"
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Button 
                        component="a" 
                        href={Website} 
                        target='_blank' 
                        endIcon={<OpenInNewIcon />} 
                        variant='outlined' 
                        size='small'
                        sx={{ mb: 1, textTransform: 'none' }}
                    >
                        {hostname}
                    </Button>
                    <Typography variant="h6" gutterBottom>{h3}</Typography>
                    <Typography variant="body2" paragraph>{Acyklama}</Typography>
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                        {ServiceName.split(',').map((service, index) => (
                            <Grid item key={index}>
                                <Chip 
                                    size='small' 
                                    label={service.trim()} 
                                    sx={{ textTransform: 'lowercase' }} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Accordion expanded={expanded} onChange={handleChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="sponsorship-content"
                            id="sponsorship-header"
                        >
                            <Typography>
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
                                    duplicateTitles.filter(Boolean).map((title, i, arr) => (
                                        <React.Fragment key={i}>
                                            <i>{title} dizisi</i>{i < arr.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))
                                    : 
                                    <i>{TVSeriesTitle} dizisi</i>
                                }
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Paper>
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