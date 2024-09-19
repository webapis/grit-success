'use client'
import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Box, Button, Tooltip } from '@mui/material';
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
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const StyledImage = styled(Image)(({ theme }) => ({
  height: 100,
  width: 'auto',
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

export default function SearchResultItem({ item, userViewData }) {
  const { Name: name, Website, Acyklama, TVSeriesTitle, tag, brandTag, ServiceName, h3 } = item;
  const imageName = brandTag || extractSubdomain(Website);
  const hostname = new URL(Website).hostname;

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

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Dizi: {TVSeriesTitle}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          <Tooltip title="Sponsor" arrow>
            <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.8em', mr: 1 }}>
              S:
            </Box>
          </Tooltip>
          {name}
        </Typography>
        {ServiceName && (
          <Box sx={{ mt: 1, mb: 2 }}>
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
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          {h3}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {Acyklama}
        </Typography>

      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2, mt: 'auto' }}>
      <ViewCount rootPath="dizisponsoru" linkId={Website} userViewData={userViewData} />
        <Button
          variant="outlined"
          size="small"
          endIcon={<OpenInNewIcon />}
          component={ClickableLink}
          rootPath="dizisponsoru"
          clickable={1}
          title={hostname}
          linkId={Website}
          sx={{ textTransform: 'none' }}
        >
          Visit Site
        </Button>
      </CardActions>
    </StyledCard>
  );
}