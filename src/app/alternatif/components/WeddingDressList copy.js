import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import ClickableLink from '@/app/utils/firebase/ClickableLink';
import ViewCount from '@/app/utils/firebase/ViewCount';
const WeddingDressList = ({ dresses, header, userViewData }) => {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{
          width: { xs: '100%', md: '50%' },
          margin: 'auto',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          padding: { xs: '0 1rem', md: 0 }
        }}
      >
        {header}
      </Typography>

      <Box className="wedding-dress-list" sx={{ maxWidth: 800, margin: '0 auto', padding: '0 15px' }}>
        <List>
          {dresses.sort((a, b) => a.price - b.price).map((dress, index) => {
            const minPrice = Math.min(...dress.prices);
            const maxPrice = Math.max(...dress.prices);

            return (
              <Card key={index} sx={{ display: 'flex', marginBottom: 2, padding: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 100,
                    height: 150,
                    objectFit: 'cover',
                    marginRight: 2,
                  }}
                  image={dress.urls.imageURL || 'https://via.placeholder.com/100x150'}
                  alt={dress.urls.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      Ortalama Fiyat:
                    </Typography>
                    <Chip
                      label={dress.priceFormatted}
                      size="small"
                      sx={{
                        ml: 1,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        height: 'auto',
                        padding: '2px 8px',
                        '@media (max-width: 600px)': {
                          display: 'block',
                          ml: 2
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      Fiyat Aralığı:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        ml: 1,
                        '@media (max-width: 600px)': {
                          display: 'block',
                          ml: 2
                        }
                      }}
                    >
                      {minPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} - {maxPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      Toplam Ürün:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        ml: 1,
                        '@media (max-width: 600px)': {
                          display: 'block',
                          ml: 2
                        }
                      }}
                    >
                      {dress.totalProducts}
                    </Typography>
                  </Box>
                  <List sx={{ mt: 1, p: 0 }}>
                    {dress.services && dress.services.map((service, serviceIndex) => (
                      <ListItem key={serviceIndex} sx={{ p: 0, mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={service}
                          primaryTypographyProps={{
                            variant: 'body2',
                            sx: { fontWeight: 'normal' }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  {dress.hostAddress && (
                    <Button
                      variant="outlined"
                      color="primary"
                      href={dress.urls.pageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobileSmallButton"
                      sx={{
                        mt: 2,
                        alignSelf: 'flex-start',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        '&.mobileSmallButton': {
                          '@media (max-width: 600px)': {
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            '& .MuiSvgIcon-root': {
                              fontSize: '1rem',
                            },
                          },
                        },
                      }}
                      endIcon={<OpenInNewIcon />}
                    >
                      {dress.hostAddress}
                    </Button>
                  )}

                  <ViewCount  linkId={dress.hostAddress} userViewData={userViewData} />
                </Box>
              </Card>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default WeddingDressList;