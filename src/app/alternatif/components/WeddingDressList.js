import React from 'react';
import {
  Box,
  Typography,
  List,
  Card,
  CardContent,
  CardMedia,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const WeddingDressList = ({ dresses }) => {
  return (
    <Box className="wedding-dress-list" sx={{ maxWidth: 800, margin: '0 auto', padding: '0 15px' }}>
      <Typography variant="h4" gutterBottom>
        Gelinlik Markaları
      </Typography>
      <List>
        {dresses.sort((a, b) => a.price - b.price).map((dress, index) => {
          const minPrice = Math.min(...dress.prices);
          const maxPrice = Math.max(...dress.prices);

          return (
            <Card key={index} sx={{ display: 'flex', flexWrap: { xs: 'nowrap', sm: 'wrap' }, marginBottom: 2, alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: 100, sm: 150 },
                  height: 'auto',
                  borderRadius: 1,
                  marginRight: { xs: 2, sm: 0 },
                }}
                image={dress.urls.imageURL || 'https://via.placeholder.com/150'}
                alt={dress.urls.title}
              />
              <Box className="dress-info" sx={{ flex: 1, padding: 2 }}>
                <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: 'capitalize',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    }}
                  >
                    Marka: {dress.brand}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    Ortalama Fiyat: {dress.priceFormatted}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      marginTop: 1,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    Fiyat Aralığı: {minPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} - {maxPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </Typography>
                  {dress.services && dress.services.length > 0 ? (
                    <List sx={{ marginTop: 1 }}>
                      {dress.services.map((service, serviceIndex) => (
                        <ListItem key={serviceIndex} sx={{ padding: 0 }}>
                          <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={service}
                            sx={{ margin: 0, fontSize: { xs: '0.875rem', sm: '1rem' } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 1, fontSize: { xs: '0.875rem', sm: '1rem' }, fontStyle: 'italic' }}
                    >
                      Hizmet mevcut değil
                    </Typography>
                  )}
                  {dress.hostAddress && (
                    <Button
                      variant="outlined"
                      color="primary"
                      href={dress.urls.pageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        marginTop: 2,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'none',
                        padding: '6px 16px',  // Default padding
                      }}
                      endIcon={<OpenInNewIcon />}
                    >
                      {dress.hostAddress}
                    </Button>
                  )}
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
