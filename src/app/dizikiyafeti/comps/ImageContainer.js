'use client'
import React from 'react';
import PropTypes from 'prop-types';
import Image from "./Image";
import { Typography, Grid, Container, Box, Chip, Paper, ThemeProvider, createTheme } from '@mui/material';
import SelectedDiziChip from './SelectedDiziChip';
import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

// Custom theme with Turkish-friendly font and color scheme
const turkishTheme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  palette: {
 
    secondary: {
      main: '#ffffff', // White
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

const InfoChip = React.memo(({ label, value }) => (
  <Chip
    label={`${label}: ${value}`}
    variant="outlined"
    size="small"
    sx={{
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
      m: 0.5,
      '& .MuiChip-label': {
        px: 1,
      },

    }}
  />
));

InfoChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const ImageContainer = ({ filteredData, pageTitle, userViewData }) => {
  return (
    <ThemeProvider theme={turkishTheme}>
      <Container component="main" maxWidth="lg" sx={{ bgcolor: 'background.default', py: 3 }}>
        <Box component="section" my={3} textAlign="center">
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: 'primary.secondary',
              mb: 2,
            }}
          >
            {pageTitle}
          </Typography>
          <SelectedDiziChip category={pageTitle} />
        </Box>

        <Grid container spacing={3} component="section" aria-label="Dizi Kıyafetleri">
          {filteredData.map((item,i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px' }}>
                <article>
                  <Typography 
                    variant="h2" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                      mb: 2,
                    //  color: 'primary.main',
                    }}
                  >
                    {item.TVSeriesTitle}
                  </Typography>
                  <Box mb={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <InfoChip label="Sezon" value={item.Season} />
                    <InfoChip label="Bölüm" value={item.Episode} />
                    <InfoChip label="Tarih" value={item.Date} />
                    <InfoChip label="Karakter" value={item.CaracterName} />
                    <InfoChip label="Oyuncu" value={item.FullName} />
                  </Box>

                  <Box position="relative" mb={2}>
                    <Image
                      fotografUrl={`/dk-image/${item.ImageUrl}.jpg`}
                      alt={`${item.TVSeriesTitle} dizisinde ${item.FullName}'in canlandırdığı ${item.CaracterName} karakterinin ${item.Season}. sezon ${item.Episode}. bölümündeki kıyafeti`}
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    <Box position="absolute" bottom={8} right={8}>
                      <ViewCount rootPath="dizikiyafeti" linkId={item.ProductLink} userViewData={userViewData} />
                    </Box>
                  </Box>

                  <Box mt="auto">
                    <ClickableLink
                      rootPath="dizikiyafeti"
                      brand={item.BrandTitle}
                      linkId={item.ProductLink}
                      title={item.Title.toLowerCase()}
                    />
                  </Box>
                </article>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};



export default ImageContainer;