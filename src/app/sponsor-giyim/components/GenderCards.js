'use client'
import genderData from './genderData'
import React from 'react';
import { 
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  Container,
  Box,
  Fade,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
  }
}));

const ImageWrapper = styled(Box)(({ theme, image }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '120%',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '133.33%',
  }
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  }
}));

const StyledLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  height: '100%',
  width: '100%',
  '&:focus': {
    outline: 'none',
  },
});

const GenderCard = ({ item }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  // Preload image
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

const GenderCards = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          py: { xs: 1, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Grid
          container
          spacing={{ xs: 0, sm: 2, md: 3 }}
          sx={{display:'flex',justifyContent:'center'}}
        >
          {genderData.map((item) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={item.index}
            >
              <Fade in={!isLoading} timeout={300}>
                <Box>
                  <GenderCard item={item} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default GenderCards;