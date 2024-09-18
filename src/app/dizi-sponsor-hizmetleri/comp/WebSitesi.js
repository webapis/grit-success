import React, { useState } from 'react';
import { Typography, Grid, Chip, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import extractSubdomain from './extractSubdomain';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EvTekstiliWebSiteleri = ({ data }) => {
    const { brandTag, Website, duplicateTitles, TVSeriesTitle, h3, TOTAL } = data;
    const hostname = new URL(data.Website).hostname;
    const imageName = brandTag ? brandTag : extractSubdomain(Website);
    const [expanded, setExpanded] = useState(false);
    
    const handleChange = () => {
        setExpanded(!expanded);
    };
    
    return (
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Grid container spacing={1}>
                <Grid item>
                    <img
                        component="img"
                        alt={`${imageName} marka logosu`}
                        style={{width:'100%', height:50}}
                        src={`/dizi/marka/${imageName}.jpg`}
                        loading="lazy"
                    />
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Button component="a" href={Website} target='_blank' endIcon={<OpenInNewIcon />} sx={{ textTransform: 'lowercase' }} variant='outlined' size='small'>
                                {hostname}
                            </Button>
                            <Typography variant="h6">{data.h3}</Typography>
                            <Typography variant="body1" gutterBottom>{data.Acyklama}</Typography>
                            {data.ServiceName.split(',').map((m, index) => (
                                <Chip key={index} size='small' label={m} sx={{ marginRight: 1, marginBottom: 1, textTransform:'lowercase' }} />
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Accordion expanded={expanded} onChange={handleChange}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="sponsorship-content"
                                    id="sponsorship-header"
                                >
                                    <Typography>
                                        Sponsorluk Faaliyetleri 
                                        <Chip 
                                            label={`Toplam: ${duplicateTitles? duplicateTitles.length:1}`} 
                                            size="small" 
                                            color="primary" 
                                            sx={{ marginLeft: 1 }}
                                        />
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {duplicateTitles ? 
                                            duplicateTitles.filter(f => f).map((m, i) => (
                                                <i key={i} size='small' style={{ marginRight: 5 }}>{m} dizisi, </i>
                                            ))
                                            : 
                                            <i size='small' sx={{ textTransform: 'capitalize' }}>{TVSeriesTitle} dizisi</i>
                                        }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EvTekstiliWebSiteleri;

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