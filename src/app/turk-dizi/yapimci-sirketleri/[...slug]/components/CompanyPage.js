import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import TVSeriesThumbnail from './TVSeriesThumbnail'; // Import the TVSeriesThumbnail component

const CompanyPage = ({ company }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Box sx={{ width: '100%', maxWidth: 200, margin: 'auto' }}>
            <img
              src={company.logo}
              alt={company.title}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" component="h1" gutterBottom>
            {company.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {company.description}
          </Typography>
          <MuiLink
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <LanguageIcon sx={{ mr: 0.5, fontSize: 'small' }} />
            <Typography variant="body2">
              Visit Website
            </Typography>
          </MuiLink>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        All TV Series
      </Typography>
      <Grid container spacing={3}>
        {company.tvSeries.map((series) => (
          <Grid item key={series.id} xs={6} sm={4} md={3} lg={2}>
            <TVSeriesThumbnail series={series} isMobile={isMobile} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyPage;