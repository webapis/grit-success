'use client'
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Chip, Paper, Accordion, AccordionSummary, AccordionDetails, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import extractSubdomain from './extractSubdomain';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ClickableLink from './ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
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



const WebsiteInfoComponent = ({ data, userViewData }) => {
  const { brandTag, Website, duplicateTitles, TVSeriesTitle, h3, Acyklama, ServiceName } = data;
  const hostname = new URL(Website).hostname;
  const imageName = brandTag || extractSubdomain(Website);
  const [expanded, setExpanded] = useState(false);



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

            <ClickableLink linkId={Website} title={hostname} />
            <Tooltip title="Views">
              <ViewCount rootPath={"sponsorkategori"} linkId={Website} userViewData={userViewData} />
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
