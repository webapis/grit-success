'use client'
import React, { useState, memo } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import extractSubdomain from './extractSubdomain';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClickableLink from './ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

const WebsiteInfoComponent = memo(({ data, userViewData }) => {
  const { brandTag, Website, duplicateTitles, TVSeriesTitle, h3, Acyklama, ServiceName } = data;
  const [expanded, setExpanded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const StyledImg = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: 100,
    objectFit: 'contain',
    transition: 'all 0.3s ease-in-out',
    opacity: imageLoading ? 0 : 1,
    '&:hover': {
      transform: 'scale(1.05)',
    },
  });

  const handleChange = () => setExpanded(!expanded);

  const hostname = React.useMemo(() => {
    try {
      return new URL(Website).hostname;
    } catch (error) {
      console.error('Invalid URL:', Website);
      return 'Invalid URL';
    }
  }, [Website]);

  if (!data) {
    return (
      <StyledPaper elevation={3}>
        <Typography color="error">No data available</Typography>
      </StyledPaper>
    );
  }

  const imageName = brandTag ? brandTag : extractSubdomain(Website);

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
          {imageLoading && (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={100} 
              animation="wave" 
            />
          )}
          <StyledImg
            alt={`${imageName} brand logo`}
            src={`${process.env.NEXT_PUBLIC_IMG_HOST}/dizi/marka/${imageName}.jpg`}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>

            <ClickableLink linkId={Website} title={hostname}  rootPath={"sponsorkategori"} />
            <Tooltip title="Views">
              <ViewCount rootPath={"sponsorkategori"} linkId={Website} userViewData={userViewData} />
            </Tooltip>
          </Box>
          <Typography variant="h5" gutterBottom>{h3}</Typography>
          <Typography variant="body1" paragraph>{Acyklama}</Typography>
          <Box sx={{ mb: 2 }}>
            {ServiceName.split(',').map((service, index) => (
              <StyledChip
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
});

WebsiteInfoComponent.propTypes = {
  data: PropTypes.shape({
    brandTag: PropTypes.string,
    Website: PropTypes.string.isRequired,
    duplicateTitles: PropTypes.arrayOf(PropTypes.string),
    TVSeriesTitle: PropTypes.string,
    h3: PropTypes.string.isRequired,
    Acyklama: PropTypes.string.isRequired,
    ServiceName: PropTypes.string.isRequired
  }).isRequired,
  userViewData: PropTypes.object
};

export default WebsiteInfoComponent;