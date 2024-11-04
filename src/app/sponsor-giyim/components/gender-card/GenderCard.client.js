'use client';
import React from 'react';
import { Typography, Box, useMediaQuery, CardActionArea } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { StyledCard, ImageWrapper, StyledCardContent, StyledLink } from './styles';
import { createTheme } from '@mui/material';
import { themeConfig } from './themeConfig';

const GenderCard = ({ item }) => {
  const theme = createTheme(themeConfig);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  React.useEffect(() => {
    const img = new Image();
    img.src = item.imageSrc;
    img.onerror = handleImageError;
  }, [item.imageSrc]);

  return (
    <Link href={item.url} passHref legacyBehavior>
      <StyledLink tabIndex={-1}>
        <StyledCard elevation={1}>
          <CardActionArea 
            component="div"
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              }
            }}
          >
            {imageError ? (
              <Box
                sx={{
                  width: '100%',
                  paddingTop: { xs: '120%', sm: '133.33%' },
                  bgcolor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  Image not available
                </Typography>
              </Box>
            ) : (
              <ImageWrapper 
                image={item.imageSrc}
                role="img"
                aria-label={`${item.gender} category image`}
              />
            )}
            <StyledCardContent>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                component="h3"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: {
                    xs: '0.9rem',
                    sm: '1.1rem',
                    md: '1.25rem',
                  },
                  mb: { xs: 0.5, sm: 1 },
                }}
              >
                {item.gender}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  mt: { xs: 0.5, sm: 'auto' }
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: '0.75rem',
                      sm: '0.875rem',
                    }
                  }}
                >
                  Kategoriye Git
                </Typography>
                <ArrowForwardIcon 
                  sx={{ 
                    fontSize: isMobile ? '0.8rem' : '1rem',
                    color: 'text.secondary'
                  }} 
                />
              </Box>
            </StyledCardContent>
          </CardActionArea>
        </StyledCard>
      </StyledLink>
    </Link>
  );
};

export default GenderCard;
