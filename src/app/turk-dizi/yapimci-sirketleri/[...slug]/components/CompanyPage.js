import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Link as MuiLink,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const CompanyPage = ({ company }) => {
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
            <Card>
              <a href={series.streamingUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia
                  component="img"
                  height="140"
                  image={series.thumbnail}
                  alt={series.title}
                  sx={{ objectFit: 'cover', cursor: 'pointer' }}
                />
              </a>
              <CardContent>
                <Typography variant="subtitle2" component="div" noWrap>
                  {series.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {series.year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyPage;