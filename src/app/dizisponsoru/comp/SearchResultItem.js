'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from './Image';
import ClickableLink from './ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
import extractSubdomain from './extractSubdomain';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const StyledImage = styled(Image)(({ theme }) => ({
  height: 80,
  width: 'auto',
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const ExpandableTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export default function SearchResultItem({ item, userViewData }) {
  const { Name: name, Website, Acyklama, TVSeriesTitle, tag, brandTag, ServiceName, h3 } = item;
  const imageName = brandTag || extractSubdomain(Website);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);
  const description = Acyklama || 'No description available.';
  return (
    <StyledCard elevation={2}>
      <ImageContainer>
        <StyledImage
          component="img"
          alt={`${TVSeriesTitle} dizi resmi`}
          src={`/dizi-image/${item.Tag}.jpg`}
          loading="lazy"
        />
        <StyledImage
          component="img"
          alt={`${name} marka resmi`}
          src={`/dizi/marka/${imageName}.jpg`}
          loading="lazy"
        />
      </ImageContainer>

      <ContentWrapper>
        <CardContent sx={{ flexGrow: 1, py: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" color="text.secondary">
              {TVSeriesTitle}
            </Typography>
            <Tooltip title="Visit Sponsor Website">
              <IconButton
                component={ClickableLink}
                rootPath="dizisponsoru"
                clickable={1}
                title="Visit sponsor website"
                linkId={Website}
                size="small"
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Typography variant="h6" component="div" gutterBottom>
            <Tooltip title="Sponsor" arrow>
              <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.8em', mr: 1 }}>
                S:
              </Box>
            </Tooltip>
            {name}
          </Typography>
          
          {ServiceName && (
            <Box sx={{ mt: 0.5, mb: 1 }}>
              {ServiceName.trim().replaceAll(',', ' ').split(' ')
                .filter(Boolean)
                .map((service, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={service.toLowerCase()}
                    sx={{ mr: 0.5, mb: 0.5, textTransform: 'capitalize' }}
                  />
                ))}
            </Box>
          )}
          
          {h3 && (
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {h3}
            </Typography>
          )}
          
          <ExpandableTypography 
            variant="body2" 
            color="text.secondary"
            onClick={toggleExpand}
          >
            {expanded ? description : description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </ExpandableTypography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', p: 1, pt: 0 }}>
          <ViewCount rootPath="dizisponsoru" linkId={Website} userViewData={userViewData} />
          {description.length > 100 && (
            <Tooltip title={expanded ? "Show less" : "Show more"}>
              <IconButton size="small" onClick={toggleExpand}>
                {expanded ? '▲' : '▼'}
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      </ContentWrapper>
    </StyledCard>
  );
}