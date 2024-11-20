'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardMedia,
  Button, 
  Typography, 
  Box,
  Skeleton,
  useTheme,
  Tooltip
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ProductDisplay = React.memo(({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const theme = useTheme();
  const isDevEnvironment = process.env.NEXT_PUBLIC_ENV === 'dev';
  const domain = getMainDomain(product.pageURL);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`product-${product.id}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [product.id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Custom button content with domain name handling
  const DomainButton = () => {
    const maxLength = 20; // Maximum characters to show
    const displayText = domain.length > maxLength 
      ? `${domain.substring(0, maxLength)}...` 
      : domain;

    return (
      <Tooltip 
        title={domain} 
        placement="top"
        enterDelay={500}
        arrow
        open={domain.length > maxLength ? undefined : false}
      >
        <Button
          variant="outlined"
          endIcon={<OpenInNewIcon />}
          fullWidth
          size="medium"
          aria-label={`Visit ${domain} (opens in new tab)`}
          sx={{
            textTransform: 'none',
            borderRadius: 1,
            minHeight: 36,
            padding: '6px 12px',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            '& .MuiButton-endIcon': {
              transition: 'transform 0.2s',
              ml: 'auto', // Push icon to the right
              pl: 1 // Add padding before icon
            },
            '&:hover .MuiButton-endIcon': {
              transform: 'translateX(2px)',
            },
            '& .MuiButton-startIcon': {
              mr: 1
            }
          }}
        >
          <Typography
            variant="body2"
            component="span"
            sx={{
              display: 'block',
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              flexGrow: 1
            }}
          >
            {displayText}
          </Typography>
        </Button>
      </Tooltip>
    );
  };

  return (
    <Card
      id={`product-${product.id}`}
      sx={{
        maxWidth: 345,
        width: '100%',
        margin: 'auto',
        marginTop: 3,
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        opacity: imageLoaded ? 1 : 0.9,
        border: isDevEnvironment ? 2 : 0,
        borderColor: product.isLinkCandidate 
          ? theme.palette.success.light 
          : theme.palette.error.light,
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: theme.shadows[10],
        },
        '&:focus-within': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }}
      elevation={3}
      role="article"
      aria-labelledby={`product-title-${product.id}`}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          backgroundColor: theme.palette.grey[100],
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
      >
        {isInView && (
          <>
            {!imageError ? (
              <CardMedia
                component="img"
                height="200"
                image={process.env.NEXT_PUBLIC_IMG_CDN + product.img}
                alt={product.h4}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
                sx={{
                  objectFit: 'cover',
                  transition: 'opacity 0.3s',
                  opacity: imageLoaded ? 1 : 0,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.palette.grey[200],
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <ErrorOutlineIcon 
                    sx={{ 
                      fontSize: 40,
                      color: theme.palette.grey[500],
                      mb: 1
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                  >
                    Image not available
                  </Typography>
                </Box>
              </Box>
            )}
            {!imageLoaded && !imageError && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height="100%" 
                  animation="wave"
                />
              </Box>
            )}
          </>
        )}
      </Box>

      <CardContent>
        {isDevEnvironment && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              {product.h4}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {product.title}
            </Typography>
          </Box>
        )}

        <Link 
          href={product.pageURL}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <DomainButton />
        </Link>
      </CardContent>
    </Card>
  );
});

ProductDisplay.displayName = 'ProductDisplay';

export default ProductDisplay;

function getMainDomain(url) {
  try {
    const hostname = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
      .split('/')[0];
    const matches = hostname.match(/([^.]+\.(?:\w{2,3}\.\w{2}|\w{2,}))$/);
    return matches ? matches[1] : hostname;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return 'Visit Website';
  }
}