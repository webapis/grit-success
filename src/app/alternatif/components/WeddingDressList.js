import React from 'react';
import {
  Box,
  Typography,
  List,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const WeddingDressList = ({ dresses }) => {
  return (
    <Box className="wedding-dress-list" sx={{ maxWidth: 800, margin: '0 auto', padding: '0 15px' }}>
      <Typography variant="h4" gutterBottom>
        Gelinlik Markaları
      </Typography>
      <List>
        {dresses.sort((a,b)=>a.price-b.price).map((dress, index) => {
          const minPrice = Math.min(...dress.prices);
          const maxPrice = Math.max(...dress.prices);

          return (
            <Card key={index} sx={{ display: 'flex', flexWrap: { xs: 'nowrap', sm: 'wrap' }, marginBottom: 2, alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: 100, sm: 150 }, // Adjust image width for mobile and desktop
                  height: 'auto',
                  borderRadius: 1,
                  marginRight: { xs: 2, sm: 0 }, // Add margin for spacing between image and text on mobile
                }}
                image={dress.urls.imageURL || 'https://via.placeholder.com/150'}
                alt={dress.urls.title}
              />
              <Box className="dress-info" sx={{ flex: 1, padding: 2 }}>
                <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>  {/* Adjust padding for mobile */}
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: 'capitalize',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Smaller font size on mobile
                    }}
                  >
                    Marka: {dress.brand}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' }, // Smaller font size on mobile
                    }}
                  >
                    Ortalama Fiyat: {dress.priceFormatted}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      marginTop: 1,
                      fontSize: { xs: '0.875rem', sm: '1rem' }, // Smaller font size on mobile
                    }}
                  >
                    Fiyat Aralığı: {minPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} - {maxPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={dress.urls.pageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      marginTop: 2,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font size on mobile
                    }}
                    startIcon={<LinkIcon />}
                  >
                    Sayfaya Git
                  </Button>
                </CardContent>
              </Box>
            </Card>
          );
        })}
      </List>
    </Box>
  );
};

export default WeddingDressList;
