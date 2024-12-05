'use client'

import React, { useState, useCallback, memo,useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ClickableLink from './ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
import extractSubdomain from './extractSubdomain';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageIcon from '@mui/icons-material/Image';

// Styled components remain unchanged since they're already optimized
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.grey[200]}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const StyledImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 100,
  width: 150,
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

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

// Memoized image component
const MemoizedImage = memo(function Image({ src, alt, onLoad, onError }) {
  return (
    <StyledImage
      src={src}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
});

// Update the StyledChip component
const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '6px',
  fontWeight: 500,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700],
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[900],
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

// Optional: Add a container for better chip spacing
const ChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

// Update the ServiceChips component
const ServiceChips = memo(function ServiceChips({ services }) {
  return (
    <ChipsContainer>
      {services.trim().replaceAll(',', ' ').split(' ')
        .filter(Boolean)
        .map((service, index) => (
          <StyledChip
            key={index}
            size="small"
            label={service.toLowerCase()}
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
    </ChipsContainer>
  );
});

// Memoized description component
const Description = memo(function Description({ description, expanded, onClick }) {
  const displayText = expanded 
    ? description 
    : description.length > 100 
      ? `${description.substring(0, 100)}...` 
      : description;

  return (
    <ExpandableTypography 
      variant="body2" 
      color="text.secondary"
      onClick={onClick}
    >
      {displayText}
    </ExpandableTypography>
  );
});

export default function SearchResultItem({ item, userViewData }) {
  const { Name: name, Website, Acyklama, TVSeriesTitle, tag, brandTag, ServiceName, h3 } = item;
  const imageName = brandTag || extractSubdomain(Website);
  const hostname = useMemo(() => new URL(Website).hostname, [Website]);
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({ dizi: false, marka: false });
  const [imageError, setImageError] = useState({ dizi: false, marka: false });

  const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);
  const description = Acyklama || 'No description available.';

  const handleImageLoad = useCallback((imageType) => {
    setImageLoaded(prev => ({ ...prev, [imageType]: true }));
  }, []);

  const handleImageError = useCallback((imageType) => {
    setImageError(prev => ({ ...prev, [imageType]: true }));
    console.error(`Failed to load ${imageType} image`);
  }, []);

  const renderImage = useCallback((src, alt, imageType) => {
    if (imageError[imageType]) {
      return <ImageIcon style={{ fontSize: 40, color: 'grey' }} />;
    }
    return (
      <MemoizedImage
        src={src}
        alt={alt}
        onLoad={() => handleImageLoad(imageType)}
        onError={() => handleImageError(imageType)}
      />
    );
  }, [imageError, handleImageLoad, handleImageError]);

  return (
    <StyledCard elevation={0}>
      <ImageContainer>
        <StyledImageWrapper>
          {renderImage(`${process.env.NEXT_PUBLIC_IMG_HOST}/dizi-image/${item.Tag}.jpg`, `${TVSeriesTitle} dizi resmi`, 'dizi')}
        </StyledImageWrapper>
        <StyledImageWrapper>
          {renderImage(`${process.env.NEXT_PUBLIC_IMG_HOST}/dizi/marka/${imageName}.jpg`, `${name} marka resmi`, 'marka')}
        </StyledImageWrapper>
      </ImageContainer>

      <ContentWrapper>
        <CardContent sx={{ flexGrow: 1, py: 2, px: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}
            >
              {TVSeriesTitle}
            </Typography>
            
            <IconButton
              component={ClickableLink}
              rootPath="dizisponsoru"
              clickable={1}
              title={hostname}
              linkId={Website}
              size="small"
              sx={{ 
                backgroundColor: (theme) => theme.palette.grey[50],
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: (theme) => theme.palette.primary.main,
                }
              }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography 
            variant="h6" 
            component="div" 
            gutterBottom
            sx={{ 
              fontSize: '1.2rem',
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
              mb: 2
            }}
          >
            <Tooltip title="Sponsor" arrow>
              <Box component="span" sx={{ 
                color: 'primary.main', 
                fontSize: '0.9em', 
                mr: 1,
                fontWeight: 500
              }}>
                S:
              </Box>
            </Tooltip>
            {name}
          </Typography>
          
          {ServiceName && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <ServiceChips services={ServiceName} />
            </Box>
          )}
          
          {h3 && (
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {h3}
            </Typography>
          )}
          
          <Description 
            description={description}
            expanded={expanded}
            onClick={toggleExpand}
          />
        </CardContent>

        <CardActions sx={{ 
          justifyContent: 'space-between', 
          p: 2, 
          pt: 0,
          borderTop: (theme) => `1px solid ${theme.palette.grey[100]}`
        }}>
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